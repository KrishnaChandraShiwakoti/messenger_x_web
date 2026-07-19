import axiosInstance from "./axios-instance";
import { API } from "./endpoints";

export const searchUsers = async (query: string) => {
  try {
    const response = await axiosInstance.get(API.USERS.SEARCH, {
      params: { query },
    });
    return response.data; // response body
  } catch (error: Error | any) {
    throw new Error(error?.response?.data?.message || "Failed to search users");
  }
};
