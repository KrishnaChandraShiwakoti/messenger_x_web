"use server";

import { getUserChats, createDirectChat, getChatById } from "@/lib/api/chat";
import { searchUsers } from "@/lib/api/users";

export const handleGetUserChats = async () => {
  try {
    const result = await getUserChats();
    if (result.success) {
      return { success: true, message: result.message, data: result.data };
    }
    return { success: false, message: result.message || "Failed to fetch chats" };
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to fetch chats" };
  }
};

export const handleCreateDirectChat = async (memberId: string) => {
  try {
    const result = await createDirectChat(memberId);
    if (result.success) {
      return { success: true, message: result.message, data: result.data };
    }
    return { success: false, message: result.message || "Failed to start chat" };
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to start chat" };
  }
};

export const handleGetChatById = async (id: string) => {
  try {
    const result = await getChatById(id);
    if (result.success) {
      return { success: true, message: result.message, data: result.data };
    }
    return { success: false, message: result.message || "Failed to fetch chat" };
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to fetch chat" };
  }
};

export const handleSearchUsers = async (query: string) => {
  try {
    const result = await searchUsers(query);
    if (result.success) {
      return { success: true, message: result.message, data: result.data };
    }
    return { success: false, message: result.message || "Failed to search users" };
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to search users" };
  }
};
