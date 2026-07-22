"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Ic, icons } from "@/app/constants/icons";
import { handleSendAiMessage } from "@/lib/actions/ai-action";
import type { AiMessage } from "../../_types/ai";
import { MessageInput } from "../chats/MessageInput";
import { AiMessageBubble } from "./AiMessageBubble";

export function AiAssistantClient() {
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length, sending]);

  const handleSend = async (text: string) => {
    const next: AiMessage[] = [...messages, { role: "user", text }];
    setMessages(next);
    setSending(true);
    try {
      const res = await handleSendAiMessage(next);
      if (!res.success || !res.data) {
        toast.error(res.message || "AI assistant is unavailable");
        return;
      }
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: res.data!.reply },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col overflow-hidden rounded-lg border border-[#ececff] bg-white shadow-[0_20px_55px_rgba(67,56,202,0.08)]">
      <div className="flex items-center justify-between border-b border-[#ececff] px-5 py-3.5">
        <span className="flex items-center gap-3">
          <span className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-gradient-to-br from-[#7c6df2] to-[#5146e7] text-white">
            <Ic d={icons.bot} size={20} />
          </span>
          <span>
            <span className="block text-[16px] font-bold text-[#10121f]">
              AI Assistant
            </span>
            <span className="block text-[12.5px] text-[#9aa0c8]">
              Powered by Gemini
            </span>
          </span>
        </span>
        {messages.length > 0 ? (
          <button
            type="button"
            onClick={() => setMessages([])}
            className="text-[13px] font-semibold text-[#676d99] hover:text-[#4037d5]">
            Clear chat
          </button>
        ) : null}
      </div>

      <div
        ref={scrollRef}
        className="flex-1 space-y-3 overflow-y-auto px-6 py-5">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#efedff] text-[#5146e7]">
              <Ic d={icons.bot} size={30} />
            </span>
            <p className="text-[17px] font-bold text-[#10121f]">
              Ask me anything
            </p>
            <p className="max-w-[280px] text-[14px] text-[#9aa0c8]">
              Your AI assistant can help you draft messages, answer
              questions, and more.
            </p>
          </div>
        ) : (
          messages.map((message, i) => (
            <AiMessageBubble key={i} message={message} />
          ))
        )}
        {sending ? (
          <div className="flex items-end gap-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7c6df2] to-[#5146e7] text-white">
              <Ic d={icons.bot} size={16} />
            </span>
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-[#f2f1ff] px-4 py-3">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9aa0c8] [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9aa0c8] [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9aa0c8]" />
            </div>
          </div>
        ) : null}
      </div>

      <MessageInput sending={sending} onSend={handleSend} />
    </div>
  );
}
