import { getUserData } from "@/lib/cookies";
import { ProfileClient, type UserInfo } from "./_components/profile-client";

export default async function Page() {
  const cookieUser = (await getUserData()) as UserInfo;

  return <ProfileClient initialUser={cookieUser} />;
}
