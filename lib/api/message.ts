import axiosInstance from "./axios-instance";
import { API } from "./endpoints";

export const getMessages = async (
  chatId: string,
  params?: { page?: number; limit?: number },
) => {
  try {
    const response = await axiosInstance.get(API.MESSAGES.BY_CHAT(chatId), {
      params,
    });
    return response.data; // response body
  } catch (error: Error | any) {
    throw new Error(
      error?.response?.data?.message || "Failed to fetch messages",
    );
  }
};

export const sendMessage = async (data: any) => {
  try {
    const response = await axiosInstance.post(API.MESSAGES.SEND, data);
    return response.data; // response body
  } catch (error: Error | any) {
    throw new Error(error?.response?.data?.message || "Failed to send message");
  }
};

export const markMessagesAsRead = async (
  chatId: string,
  messageIds: string[],
) => {
  try {
    const response = await axiosInstance.put(API.MESSAGES.READ, {
      chatId,
      messageIds,
    });
    return response.data; // response body
  } catch (error: Error | any) {
    throw new Error(
      error?.response?.data?.message || "Failed to mark messages as read",
    );
  }
};

export const deleteMessage = async (id: string, forEveryone?: boolean) => {
  try {
    const response = await axiosInstance.delete(
      API.MESSAGES.DELETE_BY_ID(id),
      { params: { forEveryone } },
    );
    return response.data; // response body
  } catch (error: Error | any) {
    throw new Error(
      error?.response?.data?.message || "Failed to delete message",
    );
  }
};
