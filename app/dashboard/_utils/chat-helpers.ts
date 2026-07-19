import type { ChatMember, ChatMessage, ChatSummary } from "../_types/chat";

const AVATAR_GRADIENTS = [
  "from-[#7c6df2] to-[#5146e7]",
  "from-[#60a5fa] to-[#4338d6]",
  "from-[#34d399] to-[#059669]",
  "from-[#f97316] to-[#dc2626]",
  "from-[#f472b6] to-[#a855f7]",
  "from-[#22d3ee] to-[#0891b2]",
];

export function avatarGradient(seed: string): string {
  let n = 0;
  for (let i = 0; i < seed.length; i++) n += seed.charCodeAt(i);
  return AVATAR_GRADIENTS[n % AVATAR_GRADIENTS.length];
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return (name || "?").slice(0, 2).toUpperCase();
}

export function getOtherMember(
  chat: ChatSummary,
  myUserId: string,
): ChatMember | undefined {
  return chat.members.find((m) => m._id !== myUserId);
}

export function getChatDisplayName(
  chat: ChatSummary,
  myUserId: string,
): string {
  if (chat.type === "group") return chat.name || "Group chat";
  return getOtherMember(chat, myUserId)?.fullName || "Unknown user";
}

export function getChatAvatarUrl(
  chat: ChatSummary,
  myUserId: string,
): string | undefined {
  if (chat.type === "group") return chat.groupIcon;
  return getOtherMember(chat, myUserId)?.profilePicture;
}

export function isChatOnline(chat: ChatSummary, myUserId: string): boolean {
  if (chat.type === "group") return false;
  return getOtherMember(chat, myUserId)?.status === "online";
}

export function formatMessageTime(iso?: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

// Short relative label for the chat list ("2m", "14m", "1h", "3d") to match
// the compact timestamps shown next to each conversation preview.
export function formatRelativeShort(iso?: string): string {
  if (!iso) return "";
  const diffMs = Date.now() - new Date(iso).getTime();
  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;
  if (diffMs < minute) return "now";
  if (diffMs < hour) return `${Math.floor(diffMs / minute)}m`;
  if (diffMs < day) return `${Math.floor(diffMs / hour)}h`;
  if (diffMs < 7 * day) return `${Math.floor(diffMs / day)}d`;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function getUnreadMessageIds(
  messages: ChatMessage[],
  myUserId: string,
): string[] {
  return messages
    .filter(
      (m) =>
        m.sender !== myUserId &&
        !m.readBy.some((r) => r.userId === myUserId),
    )
    .map((m) => m._id);
}

export function isMessageFromMe(message: ChatMessage, myUserId: string) {
  return message.sender === myUserId;
}
