export interface CallHistoryEntry {
  id: string;
  chatId: string;
  isGroup: boolean;
  chatName?: string;
  chatAvatar?: string;
  peerId?: string;
  isOutgoing: boolean;
  callType: "audio" | "video";
  status:
    | "ringing"
    | "completed"
    | "missed"
    | "declined"
    | "cancelled"
    | "no_answer";
  durationSec?: number;
  createdAt: string;
}
