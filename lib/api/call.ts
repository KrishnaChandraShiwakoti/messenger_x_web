import axiosInstance from "./axios-instance";
import { API } from "./endpoints";

export interface IceServer {
  urls: string | string[];
  username?: string;
  credential?: string;
}

export const getIceServers = async () => {
  try {
    const response = await axiosInstance.get(API.CONFIG.ICE_SERVERS);
    return response.data; // response body (ApiResponseHelper envelope)
  } catch (error: Error | any) {
    throw new Error(
      error?.response?.data?.message || "Failed to fetch ICE server config",
    );
  }
};

export const getCallHistory = async (params?: {
  page?: number;
  limit?: number;
}) => {
  try {
    const response = await axiosInstance.get(API.MESSAGES.CALLS_HISTORY, {
      params,
    });
    return response.data; // response body (ApiResponseHelper envelope)
  } catch (error: Error | any) {
    throw new Error(
      error?.response?.data?.message || "Failed to fetch call history",
    );
  }
};
