import { getUserData } from "@/lib/cookies";
import { ChatsClient } from "./_components/chats/ChatsClient";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const cookieUser = await getUserData();
  const { chat } = await searchParams;
  const initialChatId = typeof chat === "string" ? chat : undefined;

  return <ChatsClient initialUser={cookieUser} initialChatId={initialChatId} />;
}
