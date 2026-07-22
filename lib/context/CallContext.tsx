"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Socket } from "socket.io-client";
import { toast } from "react-toastify";
import { getTokenCookie } from "@/lib/cookies";
import { useAuth } from "@/lib/context/AuthContext";
import { createSocket } from "@/lib/socket/socket-client";
import { handleGetIceServers } from "@/lib/actions/call-action";
import type { IceServer } from "@/lib/api/call";
import {
  attachLocalTracks,
  buildPeerConnection,
  getLocalStream,
  stopStream,
} from "@/lib/call/webrtc";
import { IncomingCallModal } from "@/app/dashboard/_components/calls/IncomingCallModal";
import { CallScreen } from "@/app/dashboard/_components/calls/CallScreen";

export type CallType = "audio" | "video";
export type CallPhase = "idle" | "outgoing" | "incoming" | "active";

export interface CallPeer {
  name: string;
  avatarUrl?: string;
}

export interface ActiveCallInfo {
  callId: string;
  chatId: string;
  callType: CallType;
  peer: CallPeer;
}

interface CallContextValue {
  phase: CallPhase;
  call: ActiveCallInfo | null;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  muted: boolean;
  cameraOff: boolean;
  startCall: (chatId: string, callType: CallType, peer: CallPeer) => void;
  acceptCall: () => void;
  rejectCall: () => void;
  endCall: () => void;
  toggleMute: () => void;
  toggleCamera: () => void;
}

const CallContext = createContext<CallContextValue | undefined>(undefined);

export function useCall(): CallContextValue {
  const ctx = useContext(CallContext);
  if (!ctx) throw new Error("useCall must be used within a CallProvider");
  return ctx;
}

const DEFAULT_ICE_SERVERS: IceServer[] = [
  { urls: "stun:stun.l.google.com:19302" },
];

const REASON_MESSAGES: Record<string, string> = {
  declined: "Call declined",
  busy: "User is on another call",
  offline: "User is offline",
  cancelled: "Call cancelled",
  no_answer: "No answer",
  hangup: "Call ended",
  peer_disconnected: "Call disconnected",
};

export function CallProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();

  const socketRef = useRef<Socket | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const callIdRef = useRef<string | null>(null);
  const pendingIceRef = useRef<RTCIceCandidateInit[]>([]);
  const iceServersRef = useRef<IceServer[] | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  const [phase, setPhase] = useState<CallPhase>("idle");
  const [call, setCall] = useState<ActiveCallInfo | null>(null);
  const [incomingCaller, setIncomingCaller] = useState<CallPeer | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);

  const resetCallState = useCallback(() => {
    pcRef.current?.close();
    pcRef.current = null;
    callIdRef.current = null;
    pendingIceRef.current = [];
    stopStream(localStreamRef.current);
    localStreamRef.current = null;
    setLocalStream(null);
    setRemoteStream(null);
    setPhase("idle");
    setCall(null);
    setIncomingCaller(null);
    setMuted(false);
    setCameraOff(false);
  }, []);

  const ensureIceServers = useCallback(async (): Promise<IceServer[]> => {
    if (iceServersRef.current) return iceServersRef.current;
    const res = await handleGetIceServers();
    const servers =
      res.success && res.data?.iceServers?.length
        ? res.data.iceServers
        : DEFAULT_ICE_SERVERS;
    iceServersRef.current = servers;
    return servers;
  }, []);

  const wirePeerConnection = useCallback(
    (pc: RTCPeerConnection, socket: Socket, callId: string) => {
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("call:ice-candidate", {
            callId,
            candidate: event.candidate.toJSON(),
          });
        }
      };
      pc.ontrack = (event) => {
        setRemoteStream(event.streams[0] ?? null);
      };
    },
    [],
  );

  // --- socket + signaling lifecycle, tied to auth state ---
  useEffect(() => {
    if (!isAuthenticated) {
      socketRef.current?.disconnect();
      socketRef.current = null;
      resetCallState();
      return;
    }

    let cancelled = false;

    (async () => {
      const token = await getTokenCookie();
      if (!token || cancelled) return;

      const socket = createSocket(token);
      socketRef.current = socket;

      socket.on(
        "call:incoming",
        (payload: {
          callId: string;
          chatId: string;
          callType: CallType;
          caller: { id: string; fullName: string; profilePicture?: string };
        }) => {
          callIdRef.current = payload.callId;
          setCall({
            callId: payload.callId,
            chatId: payload.chatId,
            callType: payload.callType,
            peer: {
              name: payload.caller.fullName,
              avatarUrl: payload.caller.profilePicture,
            },
          });
          setIncomingCaller({
            name: payload.caller.fullName,
            avatarUrl: payload.caller.profilePicture,
          });
          setPhase("incoming");
        },
      );

      socket.on("call:accepted", async ({ callId }: { callId: string }) => {
        if (callIdRef.current !== callId || !socketRef.current) return;
        try {
          const iceServers = await ensureIceServers();
          const pc = buildPeerConnection(iceServers);
          pcRef.current = pc;
          wirePeerConnection(pc, socketRef.current, callId);

          const stream = localStreamRef.current;
          if (stream) attachLocalTracks(pc, stream);

          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          socketRef.current.emit("call:offer", { callId, sdp: offer });
          setPhase("active");
        } catch (e) {
          console.error("Failed to start call after accept", e);
          resetCallState();
        }
      });

      socket.on(
        "call:ended",
        (payload: { callId: string; reason: string }) => {
          if (callIdRef.current !== payload.callId) return;
          const message = REASON_MESSAGES[payload.reason];
          if (message) toast.info(message);
          resetCallState();
        },
      );

      socket.on(
        "call:offer",
        async ({
          callId,
          sdp,
        }: {
          callId: string;
          sdp: RTCSessionDescriptionInit;
        }) => {
          if (callIdRef.current !== callId || !pcRef.current) return;
          await pcRef.current.setRemoteDescription(sdp);
          for (const candidate of pendingIceRef.current) {
            await pcRef.current.addIceCandidate(candidate);
          }
          pendingIceRef.current = [];
          const answer = await pcRef.current.createAnswer();
          await pcRef.current.setLocalDescription(answer);
          socketRef.current?.emit("call:answer", { callId, sdp: answer });
        },
      );

      socket.on(
        "call:answer",
        async ({
          callId,
          sdp,
        }: {
          callId: string;
          sdp: RTCSessionDescriptionInit;
        }) => {
          if (callIdRef.current !== callId || !pcRef.current) return;
          await pcRef.current.setRemoteDescription(sdp);
          for (const candidate of pendingIceRef.current) {
            await pcRef.current.addIceCandidate(candidate);
          }
          pendingIceRef.current = [];
        },
      );

      socket.on(
        "call:ice-candidate",
        async ({
          callId,
          candidate,
        }: {
          callId: string;
          candidate: RTCIceCandidateInit;
        }) => {
          if (callIdRef.current !== callId) return;
          if (!pcRef.current || !pcRef.current.remoteDescription) {
            pendingIceRef.current.push(candidate);
            return;
          }
          await pcRef.current.addIceCandidate(candidate);
        },
      );

      socket.connect();
    })();

    return () => {
      cancelled = true;
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, resetCallState, ensureIceServers, wirePeerConnection]);

  const startCall = useCallback(
    (chatId: string, callType: CallType, peer: CallPeer) => {
      const socket = socketRef.current;
      if (!socket || phase !== "idle") return;

      socket.emit(
        "call:invite",
        { chatId, callType },
        (response: { callId?: string; error?: string }) => {
          if (!response.callId || response.error) {
            toast.error(REASON_MESSAGES[response.error ?? ""] ?? "Call failed");
            return;
          }
          callIdRef.current = response.callId;
          setCall({ callId: response.callId, chatId, callType, peer });
          setPhase("outgoing");
        },
      );

      // Grab local media immediately so the caller sees their own preview
      // while ringing; attached to the RTCPeerConnection once accepted.
      getLocalStream(callType)
        .then((stream) => {
          localStreamRef.current = stream;
          setLocalStream(stream);
        })
        .catch((e) => {
          console.error("Failed to access camera/microphone", e);
          toast.error("Could not access camera/microphone");
        });
    },
    [phase],
  );

  const acceptCall = useCallback(() => {
    const socket = socketRef.current;
    const current = call;
    if (!socket || !current || phase !== "incoming") return;

    (async () => {
      try {
        const stream = await getLocalStream(current.callType);
        localStreamRef.current = stream;
        setLocalStream(stream);

        const iceServers = await ensureIceServers();
        const pc = buildPeerConnection(iceServers);
        pcRef.current = pc;
        wirePeerConnection(pc, socket, current.callId);
        attachLocalTracks(pc, stream);

        socket.emit("call:accept", { callId: current.callId });
        setIncomingCaller(null);
        setPhase("active");
      } catch (e) {
        console.error("Failed to accept call", e);
        toast.error("Could not access camera/microphone");
        socket.emit("call:reject", { callId: current.callId });
        resetCallState();
      }
    })();
  }, [call, phase, ensureIceServers, wirePeerConnection, resetCallState]);

  const rejectCall = useCallback(() => {
    const socket = socketRef.current;
    if (!socket || !call || phase !== "incoming") return;
    socket.emit("call:reject", { callId: call.callId });
    resetCallState();
  }, [call, phase, resetCallState]);

  const endCall = useCallback(() => {
    const socket = socketRef.current;
    if (!socket || !call) return;
    socket.emit(phase === "outgoing" ? "call:cancel" : "call:end", {
      callId: call.callId,
    });
    resetCallState();
  }, [call, phase, resetCallState]);

  const toggleMute = useCallback(() => {
    setMuted((current) => {
      const next = !current;
      localStreamRef.current
        ?.getAudioTracks()
        .forEach((track) => (track.enabled = !next));
      return next;
    });
  }, []);

  const toggleCamera = useCallback(() => {
    setCameraOff((current) => {
      const next = !current;
      localStreamRef.current
        ?.getVideoTracks()
        .forEach((track) => (track.enabled = !next));
      return next;
    });
  }, []);

  const value: CallContextValue = {
    phase,
    call,
    localStream,
    remoteStream,
    muted,
    cameraOff,
    startCall,
    acceptCall,
    rejectCall,
    endCall,
    toggleMute,
    toggleCamera,
  };

  return (
    <CallContext.Provider value={value}>
      {children}
      {phase === "incoming" && call && incomingCaller ? (
        <IncomingCallModal
          caller={incomingCaller}
          callType={call.callType}
          onAccept={acceptCall}
          onReject={rejectCall}
        />
      ) : null}
      {(phase === "outgoing" || phase === "active") && call ? (
        <CallScreen
          call={call}
          phase={phase}
          localStream={localStream}
          remoteStream={remoteStream}
          muted={muted}
          cameraOff={cameraOff}
          onToggleMute={toggleMute}
          onToggleCamera={toggleCamera}
          onEndCall={endCall}
        />
      ) : null}
    </CallContext.Provider>
  );
}
