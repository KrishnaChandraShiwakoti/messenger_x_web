import Image from "next/image";
import Link from "next/link";

import logo from "@/app/assets/images/logo.png";
import { AuthProvider } from "@/lib/context/AuthContext";
import { DashboardNav } from "./_components/dashboard-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-screen overflow-hidden bg-[#fbfbfe] text-[#10121f]">
      <aside className="flex h-screen w-full max-w-[350px] shrink-0 flex-col overflow-hidden border-r border-[#ececff] bg-white px-2 py-1 shadow-[18px_0_40px_rgba(67,56,202,0.04)]">
        <Link
          href="/dashboard"
          className="mb-10 flex w-fit items-center gap-2"
          aria-label="MessengerX dashboard">
          <Image
            src={logo}
            alt=""
            width={68}
            height={54}
            className="object-contain"
            priority
          />
          <span className="text-[26px] font-medium tracking-normal text-black">
            MessengerX
          </span>
        </Link>

        <DashboardNav />
      </aside>

      <AuthProvider>
        <main className="h-screen min-w-0 flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </AuthProvider>
    </section>
  );
}
