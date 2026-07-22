"use client";

import { Ic, icons } from "@/app/constants/icons";
import type { AiMessage } from "../../_types/ai";

export function AiMessageBubble({ message }: { message: AiMessage }) {
  const fromMe = message.role === "user";

  return (
    <div
      className={`flex items-end gap-2 ${fromMe ? "justify-end" : "justify-start"}`}>
      {!fromMe ? (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7c6df2] to-[#5146e7] text-white">
          <Ic d={icons.bot} size={16} />
        </span>
      ) : null}
      <div
        className={`max-w-[70%] flex flex-col ${fromMe ? "items-end" : "items-start"}`}>
        <div
          className={`rounded-2xl px-4 py-2.5 text-[14.5px] leading-relaxed whitespace-pre-wrap break-words ${
            fromMe
              ? "rounded-br-md bg-[#4338d6] text-white"
              : "rounded-bl-md bg-[#f2f1ff] text-[#181a2e]"
          }`}>
          {message.text}
        </div>
      </div>
    </div>
  );
}
