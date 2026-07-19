import { getUserData } from "@/lib/cookies";
import { ChatsClient } from "./_components/chats/ChatsClient";

export default async function Page() {
  const cookieUser = await getUserData();

  return <ChatsClient initialUser={cookieUser} />;
}
