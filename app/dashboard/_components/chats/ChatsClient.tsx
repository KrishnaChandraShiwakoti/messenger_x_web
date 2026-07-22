"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/lib/context/AuthContext";
import {
  handleGetUserChats,
  handleCreateDirectChat,
} from "@/lib/actions/chat-action";
import {
  handleGetMessages,
  handleSendMessage,
  handleMarkMessagesAsRead,
} from "@/lib/actions/message-action";
import { handleUpdateProfile } from "@/lib/actions/auth-action";
import {
  decryptMessage,
  encryptMessage,
  getOrCreateIdentityKeyPair,
} from "@/lib/crypto/e2ee";
import type { ChatMessage, ChatSummary } from "../../_types/chat";
import { getUnreadMessageIds } from "../../_utils/chat-helpers";
import { ChatListPanel } from "./ChatListPanel";
import { ConversationPanel, type DecryptedMessage } from "./ConversationPanel";

const CHAT_POLL_MS = 6000;
const MESSAGE_POLL_MS = 3000;

function sortChatsByActivity(chats: ChatSummary[]): ChatSummary[] {
  return [...chats].sort((a, b) => {
    const aTime = new Date(a.lastMessage?.createdAt ?? a.updatedAt).getTime();
    const bTime = new Date(b.lastMessage?.createdAt ?? b.updatedAt).getTime();
    return bTime - aTime;
  });
}

export function ChatsClient({
  initialUser,
  initialChatId,
}: {
  initialUser: any;
  initialChatId?: string;
}) {
  const { user: authUser } = useAuth();
  const currentUser = authUser ?? initialUser;
  const myUserId: string | undefined = currentUser?._id;

  const [secretKey, setSecretKey] = useState<string | null>(null);
  const [chats, setChats] = useState<ChatSummary[]>([]);
  const [chatsLoading, setChatsLoading] = useState(true);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(
    initialChatId ?? null,
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const identitySynced = useRef(false);

  // Ensure this browser has an identity keypair and that the server has our
  // current public key on file, so other members can encrypt to us.
  useEffect(() => {
    if (!myUserId || identitySynced.current) return;
    identitySynced.current = true;
    const identity = getOrCreateIdentityKeyPair(myUserId);
    setSecretKey(identity.secretKey);
    if (currentUser?.publicKey !== identity.publicKey) {
      const formData = new FormData();
      formData.append("publicKey", identity.publicKey);
      handleUpdateProfile(formData).catch(() => {
        identitySynced.current = false;
      });
    }
  }, [myUserId, currentUser?.publicKey]);

  const loadChats = useCallback(async () => {
    const res = await handleGetUserChats();
    if (res.success) {
      setChats(sortChatsByActivity(res.data ?? []));
    }
    setChatsLoading(false);
  }, []);

  useEffect(() => {
    if (!myUserId) return;
    // Deferred via a resolved promise so the initial fetch runs inside a
    // callback rather than as a direct effect-body call.
    Promise.resolve().then(() => void loadChats());
    const interval = setInterval(() => void loadChats(), CHAT_POLL_MS);
    return () => clearInterval(interval);
  }, [myUserId, loadChats]);

  const selectedChat = useMemo(
    () => chats.find((c) => c._id === selectedChatId) ?? null,
    [chats, selectedChatId],
  );

  // Reset the message thread the moment the selected chat changes, so a
  // chat switch never briefly shows the previous chat's messages under the
  // new header. Adjusting state during render (rather than in an effect)
  // avoids the extra render pass an effect-based reset would cause.
  const [messagesChatId, setMessagesChatId] = useState<string | null>(null);
  if (selectedChatId !== messagesChatId) {
    setMessagesChatId(selectedChatId);
    setMessages([]);
  }

  const loadMessages = useCallback(
    async (chatId: string, showLoading?: boolean) => {
      if (showLoading) setMessagesLoading(true);
      try {
        const res = await handleGetMessages(chatId, { limit: 50 });
        if (!res.success) return;
        const ordered = (res.data ?? []).slice().reverse();
        setMessages(ordered);
        if (myUserId) {
          const unreadIds = getUnreadMessageIds(ordered, myUserId);
          if (unreadIds.length > 0) {
            await handleMarkMessagesAsRead(chatId, unreadIds);
            void loadChats();
          }
        }
      } finally {
        if (showLoading) setMessagesLoading(false);
      }
    },
    [myUserId, loadChats],
  );

  useEffect(() => {
    if (!selectedChatId) return;
    Promise.resolve().then(() => void loadMessages(selectedChatId, true));
    const interval = setInterval(() => void loadMessages(selectedChatId), MESSAGE_POLL_MS);
    return () => clearInterval(interval);
  }, [selectedChatId, loadMessages]);

  const handleStartChat = useCallback(
    async (memberId: string) => {
      const res = await handleCreateDirectChat(memberId);
      if (!res.success || !res.data) {
        toast.error(res.message || "Could not start chat");
        return;
      }
      await loadChats();
      setSelectedChatId(res.data._id);
    },
    [loadChats],
  );

  const handleSend = useCallback(
    async (text: string) => {
      if (!selectedChat || !myUserId || !secretKey) return;
      const recipients = selectedChat.members.map((m) => ({
        userId: m._id,
        publicKey: m.publicKey,
      }));
      const { content, keys } = encryptMessage(text, recipients, secretKey);
      if (keys.length === 0) {
        toast.error("This recipient hasn't set up encryption yet.");
        return;
      }
      setSending(true);
      try {
        const res = await handleSendMessage({
          chatId: selectedChat._id,
          type: "text",
          content,
          keys,
        });
        if (!res.success) {
          toast.error(res.message || "Failed to send message");
          return;
        }
        await loadMessages(selectedChat._id);
        await loadChats();
      } finally {
        setSending(false);
      }
    },
    [selectedChat, myUserId, secretKey, loadMessages, loadChats],
  );

  const decrypted: DecryptedMessage[] = useMemo(() => {
    if (!myUserId || !secretKey || !selectedChat) return [];
    return messages.map((message) => {
      const sender = selectedChat.members.find((m) => m._id === message.sender);
      const text = decryptMessage(message, myUserId, secretKey, sender?.publicKey);
      return { message, text, sender };
    });
  }, [messages, myUserId, secretKey, selectedChat]);

  if (!myUserId) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center rounded-lg border border-[#ececff] bg-white text-[14px] text-[#9aa0c8]">
        Loading…
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden rounded-lg border border-[#ececff] bg-white shadow-[0_20px_55px_rgba(67,56,202,0.08)]">
      <ChatListPanel
        chats={chats}
        loading={chatsLoading}
        myUserId={myUserId}
        secretKey={secretKey}
        selectedChatId={selectedChatId}
        onSelectChat={setSelectedChatId}
        onStartChat={handleStartChat}
      />
      <ConversationPanel
        chat={selectedChat}
        myUserId={myUserId}
        decrypted={decrypted}
        loading={messagesLoading}
        sending={sending}
        onSend={handleSend}
      />
    </div>
  );
}
