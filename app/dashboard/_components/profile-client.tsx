"use client";

import { Ic, icons } from "@/app/constants/icons";
import { useAuth } from "@/lib/context/AuthContext";

export type UserInfo = Record<string, unknown> | null;

const accountItems = [
  {
    title: "Edit Profile",
    subtitle: "Name, photo, about",
    icon: icons.user,
    tone: "text-[#5146e7] bg-[#eeedff]",
  },
  {
    title: "Privacy",
    subtitle: "Who can see your info",
    icon: icons.lock,
    tone: "text-[#7c3aed] bg-[#f3e8ff]",
  },
  {
    title: "Security",
    subtitle: "Two-factor authentication",
    icon: icons.shield,
    tone: "text-[#0891b2] bg-[#e0f7fb]",
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
            className="flex min-h-[86px] w-full items-center gap-5 rounded-lg border border-[#e5e7f4] bg-white px-6 text-left shadow-[0_12px_28px_rgba(67,56,202,0.06)] transition hover:border-[#d9d4ff] hover:bg-[#fbfaff]">
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

  return (
    <div className="mx-auto flex w-full max-w-[980px] flex-col gap-8">
      <section className="overflow-hidden rounded-lg border border-[#e4e6f4] bg-white shadow-[0_20px_55px_rgba(67,56,202,0.08)]">
        <div className="bg-[#f5f6ff] px-8 pb-8 pt-10 text-center">
          <div className="relative mx-auto mb-5 h-[132px] w-[132px]">
            <div className="flex h-full w-full items-center justify-center rounded-[30px] bg-[#4338ca] text-[56px] font-black text-white shadow-[0_20px_40px_rgba(67,56,202,0.26)]">
              {initial}
            </div>
            <button
              type="button"
              aria-label="Change profile photo"
              className="absolute -bottom-1 -right-1 flex h-12 w-12 items-center justify-center rounded-lg border-4 border-[#f5f6ff] bg-[#6d4df2] text-white shadow-[0_10px_22px_rgba(109,77,242,0.32)]">
              <Ic d={icons.camera} size={22} stroke2={2.2} />
            </button>
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
