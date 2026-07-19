"use client";

import Image from "next/image";
import type { ChatSummary } from "../../_types/chat";
import {
  avatarGradient,
  getChatAvatarUrl,
  getChatDisplayName,
  getInitials,
  isChatOnline,
  formatRelativeShort,
} from "../../_utils/chat-helpers";

export function ChatListItem({
  chat,
  myUserId,
  previewText,
  active,
  onClick,
}: {
  chat: ChatSummary;
  myUserId: string;
  previewText: string;
  active: boolean;
  onClick: () => void;
}) {
  const name = getChatDisplayName(chat, myUserId);
  const avatarUrl = getChatAvatarUrl(chat, myUserId);
  const online = isChatOnline(chat, myUserId);
  const unread = chat.unreadCount ?? 0;
  const timeLabel = formatRelativeShort(chat.lastMessage?.createdAt ?? chat.updatedAt);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 border-b border-[#f2f1ff] px-4 py-3 text-left transition-colors ${
        active ? "bg-[#efedff]" : "hover:bg-[#f9f8ff]"
      }`}>
      <span className="relative shrink-0">
        {avatarUrl ? (
          <Image
            src={process.env.NEXT_PUBLIC_API_URL! + avatarUrl}
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover"
          />
        ) : (
          <span
            className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br text-[15px] font-bold text-white ${avatarGradient(chat._id)}`}>
            {getInitials(name)}
          </span>
        )}
        {online ? (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#22c55e]" />
        ) : null}
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2">
          <span className="truncate text-[15px] font-bold text-[#10121f]">
            {name}
          </span>
          <span className="shrink-0 text-[12px] font-medium text-[#9aa0c8]">
            {timeLabel}
          </span>
        </span>
        <span className="mt-0.5 flex items-center justify-between gap-2">
          <span
            className={`truncate text-[13.5px] ${unread > 0 ? "font-semibold text-[#3f3d56]" : "text-[#8d93ba]"}`}>
            {previewText}
          </span>
          {unread > 0 ? (
            <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[#4338d6] px-1.5 text-[11px] font-bold text-white">
              {unread > 99 ? "99+" : unread}
            </span>
          ) : null}
        </span>
      </span>
    </button>
  );
}
