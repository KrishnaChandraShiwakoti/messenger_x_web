"use server";
import { cookies } from "next/headers";
export async function setTokenCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "auth_token",
    value: token,
  });
}
export async function getTokenCookie() {
  const cookieStore = await cookies();
  return cookieStore.get("auth_token")?.value;
}
export async function storeUserData(userData: any) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "user_data",
    value: JSON.stringify(userData), // change object into string
  });
}
export async function getUserData() {
  const cookieStore = await cookies();
  const userDataCookie = cookieStore.get("user_data")?.value;
  return userDataCookie ? JSON.parse(userDataCookie) : null; // change string into object
}
export const getUserInfoCookie = async () => {
  const cookieStore = await cookies();
  const userInfoStr = cookieStore.get("user_data")?.value || null;
  return userInfoStr ? JSON.parse(userInfoStr) : null; // convert string back to obj
};
export const clearAuthCookies = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  cookieStore.delete("user_data");
};
