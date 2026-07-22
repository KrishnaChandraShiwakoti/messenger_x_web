"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { Ic, icons } from "@/app/constants/icons";
import { useCall } from "@/lib/context/CallContext";
import type { ChatMember, ChatMessage, ChatSummary } from "../../_types/chat";
import {
  avatarGradient,
  getChatAvatarUrl,
  getChatDisplayName,
  getInitials,
  getOtherMember,
  isChatOnline,
} from "../../_utils/chat-helpers";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";

export interface DecryptedMessage {
  message: ChatMessage;
  text: string | null;
  sender?: ChatMember;
}

function notImplemented() {
  toast.info("Coming soon");
}

export function ConversationPanel({
  chat,
  myUserId,
  decrypted,
  loading,
  sending,
  onSend,
}: {
  chat: ChatSummary | null;
  myUserId: string;
  decrypted: DecryptedMessage[];
  loading: boolean;
  sending: boolean;
  onSend: (text: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { startCall, phase } = useCall();

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [decrypted.length, chat?._id]);

  if (!chat) {
    return (
      <div className="flex flex-1 min-w-0 flex-col items-center justify-center gap-3 bg-[#fbfbfe] text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#efedff] text-[#5146e7]">
          <Ic d={icons.chat} size={30} />
        </span>
        <p className="text-[17px] font-bold text-[#10121f]">
          Select a conversation
        </p>
        <p className="max-w-[280px] text-[14px] text-[#9aa0c8]">
          Choose an existing chat or tap + in Messages to start a new one.
        </p>
      </div>
    );
  }

  const name = getChatDisplayName(chat, myUserId);
  const avatarUrl = getChatAvatarUrl(chat, myUserId);
  const online = isChatOnline(chat, myUserId);

  return (
    <div className="flex flex-1 min-w-0 flex-col bg-[#fbfbfe]">
      <div className="flex items-center gap-3 border-b border-[#ececff] bg-white px-5 py-3.5">
        <span className="relative shrink-0">
          {avatarUrl ? (
            <Image
              src={process.env.NEXT_PUBLIC_API_URL! + avatarUrl}
              alt=""
              width={42}
              height={42}
              className="h-[42px] w-[42px] rounded-full object-cover"
            />
          ) : (
            <span
              className={`flex h-[42px] w-[42px] items-center justify-center rounded-full bg-gradient-to-br text-[14px] font-bold text-white ${avatarGradient(chat._id)}`}>
              {getInitials(name)}
            </span>
          )}
          {online ? (
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#22c55e]" />
          ) : null}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[16px] font-bold text-[#10121f]">
            {name}
          </span>
          <span className="block text-[12.5px] text-[#9aa0c8]">
            {chat.type === "group"
              ? `${chat.members.length} members`
              : online
                ? "Online"
                : "Offline"}
          </span>
        </span>
        {chat.type === "direct" ? (
          <>
            <button
              type="button"
              disabled={phase !== "idle"}
              onClick={() => {
                const peer = getOtherMember(chat, myUserId);
                startCall(chat._id, "audio", {
                  name: peer?.fullName || name,
                  avatarUrl: peer?.profilePicture,
                });
              }}
              aria-label="Voice call"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#676d99] hover:bg-[#f6f5ff] hover:text-[#4037d5] disabled:cursor-not-allowed disabled:opacity-40">
              <Ic d={icons.phone} size={17} />
            </button>
            <button
              type="button"
              disabled={phase !== "idle"}
              onClick={() => {
                const peer = getOtherMember(chat, myUserId);
                startCall(chat._id, "video", {
                  name: peer?.fullName || name,
                  avatarUrl: peer?.profilePicture,
                });
              }}
              aria-label="Video call"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#676d99] hover:bg-[#f6f5ff] hover:text-[#4037d5] disabled:cursor-not-allowed disabled:opacity-40">
              <Ic d={icons.video} size={17} />
            </button>
          </>
        ) : null}
        <button
          type="button"
          onClick={notImplemented}
          aria-label="More options"
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#676d99] hover:bg-[#f6f5ff] hover:text-[#4037d5]">
          <Ic d={icons.more} size={17} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-6 py-5">
        {loading && decrypted.length === 0 ? (
          <p className="text-center text-[13px] text-[#9aa0c8]">Loading messages…</p>
        ) : decrypted.length === 0 ? (
          <p className="text-center text-[13px] text-[#9aa0c8]">
            No messages yet. Say hello 👋
          </p>
        ) : (
          decrypted.map(({ message, text, sender }) => (
            <MessageBubble
              key={message._id}
              message={message}
              text={text}
              fromMe={message.sender === myUserId}
              senderName={
                chat.type === "group" && message.sender !== myUserId
                  ? sender?.fullName
                  : undefined
              }
            />
          ))
        )}
      </div>

      <MessageInput sending={sending} onSend={onSend} />
    </div>
  );
}
