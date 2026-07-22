import type { IceServer } from "@/lib/api/call";

export async function getLocalStream(
  callType: "audio" | "video",
): Promise<MediaStream> {
  return navigator.mediaDevices.getUserMedia({
    audio: true,
    video: callType === "video",
  });
}

export function buildPeerConnection(
  iceServers: IceServer[],
): RTCPeerConnection {
  return new RTCPeerConnection({ iceServers: iceServers as RTCIceServer[] });
}

export function attachLocalTracks(
  pc: RTCPeerConnection,
  stream: MediaStream,
): void {
  stream.getTracks().forEach((track) => pc.addTrack(track, stream));
}

export function stopStream(stream: MediaStream | null): void {
  stream?.getTracks().forEach((track) => track.stop());
}
