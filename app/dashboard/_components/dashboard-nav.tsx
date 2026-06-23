"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Ic, icons } from "@/app/constants/icons";

const navItems = [
  {
    label: "Chats",
    href: "/dashboard",
    icon: icons.chat,
    badge: "",
  },
  {
    label: "Calls",
    href: "/dashboard/calls",
    icon: icons.phone,
  },
  {
    label: "AI Assistant",
    href: "/dashboard/ai-assistant",
    icon: icons.bot,
  },
  {
    label: "Media Share",
    href: "/dashboard/media-share",
    icon: icons.image,
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: icons.user,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: icons.cog,
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Dashboard navigation" className="px-0">
      <p className="mb-5 px-5 text-[13px] font-bold uppercase tracking-[0.25em] text-[#aaa8cf]">
        Main
      </p>

      <ul className="space-y-2">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <li key={item.label}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`group flex h-[59px] items-center gap-4 rounded-[14px] px-5 text-[21px] transition-colors ${
                  isActive
                    ? "border border-[#d9d4ff] bg-[#efedff] font-bold text-[#10121f]"
                    : "font-medium text-[#676d99] hover:bg-[#f6f5ff] hover:text-[#4037d5]"
                }`}>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center ${
                    isActive ? "text-[#5146e7]" : "text-[#73799f]"
                  }`}>
                  <Ic d={item.icon} size={26} stroke2={2.05} />
                </span>
                <span className="min-w-0 flex-1">{item.label}</span>
                {item.badge ? (
                  <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-[#4338d6] px-2 text-[16px] font-bold leading-none text-white">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
