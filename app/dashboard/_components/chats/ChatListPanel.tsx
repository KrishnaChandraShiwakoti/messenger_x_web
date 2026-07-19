"use client";

import { useMemo, useState } from "react";
import { Ic, icons } from "@/app/constants/icons";
import { decryptMessage } from "@/lib/crypto/e2ee";
import type { ChatSummary } from "../../_types/chat";
import { getChatDisplayName } from "../../_utils/chat-helpers";
import { ChatListItem } from "./ChatListItem";
import { NewChatSearch } from "./NewChatSearch";

function getPreviewText(
  chat: ChatSummary,
  myUserId: string,
  secretKey: string | null,
): string {
  const lastMessage = chat.lastMessage;
  if (!lastMessage) return "No messages yet";
  if (lastMessage.type !== "text") {
    const labels: Record<string, string> = {
      image: "📷 Photo",
      video: "🎥 Video",
      audio: "🎤 Voice message",
      file: "📎 File",
    };
    return labels[lastMessage.type] ?? "Attachment";
  }
  if (!secretKey) return "…";
  const sender = chat.members.find((m) => m._id === lastMessage.sender);
  const text = decryptMessage(lastMessage, myUserId, secretKey, sender?.publicKey);
  const prefix = lastMessage.sender === myUserId ? "You: " : "";
  return text !== null ? prefix + text : "🔒 Encrypted message";
}

export function ChatListPanel({
  chats,
  loading,
  myUserId,
  secretKey,
  selectedChatId,
  onSelectChat,
  onStartChat,
}: {
  chats: ChatSummary[];
  loading: boolean;
  myUserId: string;
  secretKey: string | null;
  selectedChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onStartChat: (memberId: string) => Promise<void>;
}) {
  const [search, setSearch] = useState("");
  const [newChatOpen, setNewChatOpen] = useState(false);

  const filteredChats = useMemo(() => {
    if (!search.trim()) return chats;
    const q = search.trim().toLowerCase();
    return chats.filter((chat) =>
      getChatDisplayName(chat, myUserId).toLowerCase().includes(q),
    );
  }, [chats, search, myUserId]);

  return (
    <div className="flex w-full max-w-[340px] shrink-0 flex-col border-r border-[#ececff] bg-white">
      <div className="flex items-center justify-between px-5 py-4">
        <h2 className="text-[20px] font-bold text-[#10121f]">Messages</h2>
        <button
          type="button"
          onClick={() => setNewChatOpen((v) => !v)}
          aria-label="Start a new chat"
          className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
            newChatOpen
              ? "bg-[#4338d6] text-white"
              : "bg-[#efedff] text-[#5146e7] hover:bg-[#e2ddff]"
          }`}>
          <Ic d={icons.plus} size={18} stroke2={2.3} />
        </button>
      </div>

      {newChatOpen ? (
        <NewChatSearch
          onPick={async (memberId) => {
            await onStartChat(memberId);
            setNewChatOpen(false);
          }}
          onClose={() => setNewChatOpen(false)}
        />
      ) : (
        <div className="px-4 pb-3">
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9aa0c8]">
              <Ic d={icons.search} size={16} />
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search conversations..."
              className="h-10 w-full rounded-full border border-[#ececff] bg-[#fbfbfe] pl-9 pr-3 text-[14px] text-[#10121f] outline-none placeholder:text-[#aaa8cf] focus:border-[#5146e7]"
            />
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <p className="px-5 py-6 text-center text-[13px] text-[#9aa0c8]">
            Loading conversations…
          </p>
        ) : filteredChats.length === 0 ? (
          <p className="px-5 py-6 text-center text-[13px] text-[#9aa0c8]">
            {chats.length === 0
              ? "No conversations yet. Tap + to start one."
              : "No conversations match your search."}
          </p>
        ) : (
          filteredChats.map((chat) => (
            <ChatListItem
              key={chat._id}
              chat={chat}
              myUserId={myUserId}
              previewText={getPreviewText(chat, myUserId, secretKey)}
              active={chat._id === selectedChatId}
              onClick={() => onSelectChat(chat._id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
