import { io, type Socket } from "socket.io-client";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8088";

// Kept out of CallContext.tsx so the raw socket.io-client dependency has
// one call site - matches the backend's Socket.IO auth contract exactly
// (auth.token, verified in Backend/src/sockets/io.ts).
export function createSocket(token: string): Socket {
  return io(SOCKET_URL, {
    transports: ["websocket"],
    autoConnect: false,
    auth: { token },
  });
}
