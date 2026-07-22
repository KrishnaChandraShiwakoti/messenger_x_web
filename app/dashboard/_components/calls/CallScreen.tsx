"use client";

import { useEffect, useRef, useState } from "react";
import { Ic, icons } from "@/app/constants/icons";
import { avatarGradient, getInitials } from "../../_utils/chat-helpers";
import type { ActiveCallInfo, CallPhase } from "@/lib/context/CallContext";

function useVideoRef(stream: MediaStream | null) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.srcObject = stream;
  }, [stream]);
  return ref;
}

function useElapsedSeconds(active: boolean) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (!active) return;
    setSeconds(0);
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [active]);
  return seconds;
}

function formatDuration(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function CallScreen({
  call,
  phase,
  localStream,
  remoteStream,
  muted,
  cameraOff,
  onToggleMute,
  onToggleCamera,
  onEndCall,
}: {
  call: ActiveCallInfo;
  phase: CallPhase;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  muted: boolean;
  cameraOff: boolean;
  onToggleMute: () => void;
  onToggleCamera: () => void;
  onEndCall: () => void;
}) {
  const localVideoRef = useVideoRef(localStream);
  const remoteVideoRef = useVideoRef(remoteStream);
  const elapsed = useElapsedSeconds(phase === "active");
  const isVideo = call.callType === "video";

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#10121f] py-10 text-white">
      <div className="flex flex-col items-center gap-2">
        {call.peer.avatarUrl ? (
          <img
            src={process.env.NEXT_PUBLIC_API_URL! + call.peer.avatarUrl}
            alt=""
            className="h-24 w-24 rounded-full object-cover"
          />
        ) : (
          <span
            className={`flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br text-[28px] font-bold text-white ${avatarGradient(call.peer.name)}`}>
            {getInitials(call.peer.name)}
          </span>
        )}
        <p className="text-[20px] font-bold">{call.peer.name}</p>
        <p className="text-[13px] text-[#9aa0c8]">
          {phase === "outgoing" ? "Calling…" : formatDuration(elapsed)}
        </p>
      </div>

      {isVideo ? (
        <div className="relative w-full max-w-3xl flex-1 px-6">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="h-full w-full rounded-2xl bg-black object-cover"
          />
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="absolute bottom-4 right-10 h-32 w-24 rounded-xl border-2 border-white/20 bg-black object-cover"
          />
        </div>
      ) : (
        // Audio-only calls still need a sink for the remote stream - a
        // hidden <video> with autoPlay plays the audio track fine, keeping
        // one code path instead of a separate <audio> element.
        <video ref={remoteVideoRef} autoPlay playsInline className="hidden" />
      )}

      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={onToggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
          className={`flex h-14 w-14 items-center justify-center rounded-full transition-colors ${
            muted ? "bg-white text-[#10121f]" : "bg-white/15 text-white"
          }`}>
          <Ic d={muted ? icons.mute : icons.mic} size={20} />
        </button>
        {isVideo ? (
          <button
            type="button"
            onClick={onToggleCamera}
            aria-label={cameraOff ? "Turn camera on" : "Turn camera off"}
            className={`flex h-14 w-14 items-center justify-center rounded-full transition-colors ${
              cameraOff ? "bg-white text-[#10121f]" : "bg-white/15 text-white"
            }`}>
            <Ic d={icons.camera} size={20} />
          </button>
        ) : null}
        <button
          type="button"
          onClick={onEndCall}
          aria-label="End call"
          className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ef4444] text-white shadow-lg transition-transform hover:scale-105">
          <Ic d={icons.endcall} size={24} color="white" />
        </button>
      </div>
    </div>
  );
}
