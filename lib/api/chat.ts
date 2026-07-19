import axiosInstance from "./axios-instance";
import { API } from "./endpoints";

export const getUserChats = async () => {
  try {
    const response = await axiosInstance.get(API.CHATS.LIST);
    return response.data; // response body
  } catch (error: Error | any) {
    throw new Error(error?.response?.data?.message || "Failed to fetch chats");
  }
};

export const createDirectChat = async (memberId: string) => {
  try {
    const response = await axiosInstance.post(API.CHATS.DIRECT, { memberId });
    return response.data; // response body
  } catch (error: Error | any) {
    throw new Error(error?.response?.data?.message || "Failed to start chat");
  }
};

export const getChatById = async (id: string) => {
  try {
    const response = await axiosInstance.get(API.CHATS.BY_ID(id));
    return response.data; // response body
  } catch (error: Error | any) {
    throw new Error(error?.response?.data?.message || "Failed to fetch chat");
  }
};
