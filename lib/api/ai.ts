import axiosInstance from "./axios-instance";
import { API } from "./endpoints";
import type { AiMessage } from "@/app/dashboard/_types/ai";

export const sendAiMessage = async (messages: AiMessage[]) => {
  try {
    const response = await axiosInstance.post(API.AI.CHAT, { messages });
    return response.data; // response body (ApiResponseHelper envelope)
  } catch (error: Error | any) {
    throw new Error(
      error?.response?.data?.message || "Failed to reach the AI assistant",
    );
  }
};
