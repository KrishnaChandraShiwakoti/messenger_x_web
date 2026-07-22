"use client";

import { Ic, icons } from "@/app/constants/icons";
import type { ChatMessage } from "../../_types/chat";
import { formatMessageTime } from "../../_utils/chat-helpers";

function callLogText(message: ChatMessage): string {
  const call = message.call;
  if (!call) return "Call";
  const kind = call.callType === "video" ? "Video call" : "Voice call";
  if (call.status === "ringing") return `${kind} · Calling…`;
  if (call.status === "completed") {
    const m = Math.floor((call.durationSec ?? 0) / 60);
    const s = (call.durationSec ?? 0) % 60;
    return `${kind} · ${m}:${s.toString().padStart(2, "0")}`;
  }
  const labels: Record<string, string> = {
    missed: "Missed",
    no_answer: "No answer",
    declined: "Declined",
    cancelled: "Cancelled",
  };
  return `${kind} · ${labels[call.status] ?? call.status}`;
}

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
  if (message.type === "call") {
    return (
      <div className="flex justify-center">
        <span className="flex items-center gap-1.5 rounded-full bg-[#f2f1ff] px-3 py-1.5 text-[12.5px] font-medium text-[#676d99]">
          <Ic
            d={message.call?.callType === "video" ? icons.video : icons.phone}
            size={13}
          />
          {callLogText(message)}
        </span>
      </div>
    );
  }

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
