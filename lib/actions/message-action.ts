"use server";

import {
  getMessages,
  sendMessage,
  markMessagesAsRead,
  deleteMessage,
} from "@/lib/api/message";

export const handleGetMessages = async (
  chatId: string,
  params?: { page?: number; limit?: number },
) => {
  try {
    const result = await getMessages(chatId, params);
    if (result.success) {
      return {
        success: true,
        message: result.message,
        data: result.data,
        pagination: result.meta,
      };
    }
    return { success: false, message: result.message || "Failed to fetch messages" };
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to fetch messages" };
  }
};

export const handleSendMessage = async (data: any) => {
  try {
    const result = await sendMessage(data);
    if (result.success) {
      return { success: true, message: result.message, data: result.data };
    }
    return { success: false, message: result.message || "Failed to send message" };
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to send message" };
  }
};

export const handleMarkMessagesAsRead = async (
  chatId: string,
  messageIds: string[],
) => {
  try {
    const result = await markMessagesAsRead(chatId, messageIds);
    if (result.success) {
      return { success: true, message: result.message };
    }
    return { success: false, message: result.message || "Failed to mark messages as read" };
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to mark messages as read" };
  }
};

export const handleDeleteMessage = async (id: string, forEveryone?: boolean) => {
  try {
    const result = await deleteMessage(id, forEveryone);
    if (result.success) {
      return { success: true, message: result.message };
    }
    return { success: false, message: result.message || "Failed to delete message" };
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to delete message" };
  }
};
