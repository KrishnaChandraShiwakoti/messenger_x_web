"use server";

import { getIceServers, getCallHistory, type IceServer } from "@/lib/api/call";
import type { CallHistoryEntry } from "@/app/dashboard/_types/call";

export const handleGetIceServers = async (): Promise<{
  success: boolean;
  message: string;
  data?: { iceServers: IceServer[] };
}> => {
  try {
    const result = await getIceServers();
    if (result.success) {
      return { success: true, message: result.message, data: result.data };
    }
    return {
      success: false,
      message: result.message || "Failed to fetch ICE server config",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to fetch ICE server config",
    };
  }
};

export const handleGetCallHistory = async (params?: {
  page?: number;
  limit?: number;
}): Promise<{
  success: boolean;
  message: string;
  data?: CallHistoryEntry[];
  pagination?: { page: number; limit: number; total: number };
}> => {
  try {
    const result = await getCallHistory(params);
    if (result.success) {
      return {
        success: true,
        message: result.message,
        data: result.data,
        pagination: result.meta,
      };
    }
    return {
      success: false,
      message: result.message || "Failed to fetch call history",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to fetch call history",
    };
  }
};
