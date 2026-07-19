"use client";

import type { ChatMessage } from "../../_types/chat";
import { formatMessageTime } from "../../_utils/chat-helpers";

export function MessageBubble({
  message,
  text,
  fromMe,
  senderName,
}: {
  message: ChatMessage;
  text: string | null;
  fromMe: boolean;
  senderName?: string;
}) {
  return (
    <div className={`flex ${fromMe ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[70%] ${fromMe ? "items-end" : "items-start"} flex flex-col`}>
        {senderName ? (
          <span className="mb-1 px-1 text-[12px] font-semibold text-[#8d93ba]">
            {senderName}
          </span>
        ) : null}
        <div
          className={`rounded-2xl px-4 py-2.5 text-[14.5px] leading-relaxed ${
            fromMe
              ? "rounded-br-md bg-[#4338d6] text-white"
              : "rounded-bl-md bg-[#f2f1ff] text-[#181a2e]"
          }`}>
          {text !== null ? (
            <span className="whitespace-pre-wrap break-words">{text}</span>
          ) : (
            <span
              className={`italic ${fromMe ? "text-white/70" : "text-[#8d93ba]"}`}>
              🔒 Unable to decrypt this message
            </span>
          )}
        </div>
        <span className="mt-1 px-1 text-[11px] text-[#aaa8cf]">
          {formatMessageTime(message.createdAt)}
          {message.edited ? " · edited" : ""}
        </span>
      </div>
    </div>
  );
}
