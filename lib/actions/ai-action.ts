"use server";

import { sendAiMessage } from "@/lib/api/ai";
import type { AiMessage } from "@/app/dashboard/_types/ai";

export const handleSendAiMessage = async (
  messages: AiMessage[],
): Promise<{
  success: boolean;
  message: string;
  data?: { reply: string };
}> => {
  try {
    const result = await sendAiMessage(messages);
    if (result.success) {
      return { success: true, message: result.message, data: result.data };
    }
    return {
      success: false,
      message: result.message || "Failed to reach the AI assistant",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to reach the AI assistant",
    };
  }
};
