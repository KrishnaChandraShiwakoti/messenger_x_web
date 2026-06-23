"use client";

import { Ic, icons } from "@/app/constants/icons";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";

export type UserInfo = Record<string, unknown> | null;

const accountItems = [
  {
    title: "Edit Profile",
    subtitle: "Name, photo, Email",
    icon: icons.user,
    tone: "text-[#5146e7] bg-[#eeedff]",
    url: "/dashboard/edit-profile",
  },
  {
    title: "Privacy",
    subtitle: "Who can see your info",
    icon: icons.lock,
    tone: "text-[#7c3aed] bg-[#f3e8ff]",
  },
  {
    title: "Security",
    subtitle: "Change Password",
    icon: icons.shield,
    tone: "text-[#0891b2] bg-[#e0f7fb]",
    url: "/dashboard/security",
  },
];

const preferenceItems = [
  {
    title: "Notifications",
    subtitle: "Manage alerts",
    icon: icons.bell,
    tone: "text-[#d97706] bg-[#fff4dc]",
  },
  {
    title: "Appearance",
    subtitle: "Theme, fonts, colors",
    icon: icons.palette,
    tone: "text-[#059669] bg-[#defcf1]",
  },
  {
    title: "Sounds",
    subtitle: "Message and call tones",
    icon: icons.volume,
    tone: "text-[#dc2626] bg-[#ffe7e7]",
  },
];

function getText(user: UserInfo, keys: string[], fallback: string) {
  if (!user) {
    return fallback;
  }

  for (const key of keys) {
    const value = user[key];
    if (typeof value === "string" && value.trim()) {
      return value;
    }
    if (typeof value === "number") {
      return String(value);
    }
  }

  return fallback;
}

function ProfileSection({
  title,
  items,
}: {
  title: string;
  items: typeof accountItems;
}) {
  const router = useRouter();
  return (
    <section className="space-y-3">
      <h2 className="px-1 text-[13px] font-bold uppercase tracking-[0.28em] text-[#5146e7]">
        {title}
      </h2>
      <div className="space-y-2">
        {items.map((item) => (
          <button
            key={item.title}
            type="button"
            className="flex min-h-[86px] w-full items-center gap-5 rounded-lg border border-[#e5e7f4] bg-white px-6 text-left shadow-[0_12px_28px_rgba(67,56,202,0.06)] transition hover:border-[#d9d4ff] hover:bg-[#fbfaff]"
            onClick={() => {
              if (item.url) {
                router.push(item.url!);
              } else {
                toast.info(`Page Not added Yet`); // Show toast message
              }
            }}>
            <span
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-lg ${item.tone}`}>
              <Ic d={item.icon} size={25} stroke2={2.05} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[20px] font-bold text-[#171827]">
                {item.title}
              </span>
              <span className="mt-1 block text-[16px] font-medium text-[#6c7198]">
                {item.subtitle}
              </span>
            </span>
            <span className="text-[#8d93ba]">
              <Ic d={icons.chevR} size={24} stroke2={2.2} />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export function ProfileClient({ initialUser }: { initialUser: UserInfo }) {
  const { user: contextUser } = useAuth();
  const user = (contextUser as UserInfo) ?? initialUser;
  const name = getText(user, ["fullName", "name", "username"], "You");

  const phone = getText(user, ["phoneNumber", "phone", "mobile"], "");
  const email = getText(user, ["email"], "No email added");
  const initial = (name || email || "Y").trim().charAt(0).toUpperCase();
  const profilePicture = user?.profilePicture as string | undefined | null;

  return (
    <div className="mx-auto flex w-full max-w-[980px] flex-col gap-8">
      <section className="overflow-hidden rounded-lg border border-[#e4e6f4] bg-white shadow-[0_20px_55px_rgba(67,56,202,0.08)]">
        <div className="bg-[#f5f6ff] px-8 pb-8 pt-10 text-center">
          <div className="relative mx-auto  h-[100px] w-[100px]">
            {profilePicture ? (
              <Image
                src={process.env.NEXT_PUBLIC_API_URL! + profilePicture!}
                alt="Profile Image"
                width={100}
                height={100}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600">No Image</span>
              </div>
            )}
          </div>

          <h1 className="text-[38px] font-black leading-tight text-[#171827]">
            {name}
          </h1>

          <p className="mt-2 text-[17px] font-semibold text-[#858ab0]">
            {phone}
          </p>
          <p className="mt-1 text-[15px] font-medium text-[#9ba0bf]">{email}</p>
        </div>
      </section>

      <ProfileSection title="Account" items={accountItems} />
      <ProfileSection title="Preferences" items={preferenceItems} />
    </div>
  );
}
