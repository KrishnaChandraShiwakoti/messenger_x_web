"use client";

import { useRouter } from "next/navigation";
import RegisterForm from "../_components/registerFormZod";

export default function Page() {
  const router = useRouter();
  return (
    <div id="screen-register" className="hide relative z-10 min-h-screen flex">
      <div
        className="hidden lg:flex lg:w-[44%] xl:w-[46%] relative flex-col justify-between p-14 noise overflow-hidden bg-[linear-gradient(160deg,#0C0A1E_0%,#110E28_55%,#090B1A_100%)]
         border-r border-r-white/6">
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(124,58,237,0.14),transparent_70%)]
           blur-[70px]"></div>

        <div
          className="flex items-center gap-3 relative z-10 hover:cursor-pointer hover:text-aura-p1 transition-colors"
          onClick={() => router.push("/")}>
          <div className="w-11 h-11 rounded-2xl btn-grad flex items-center justify-center animate-glow flex-shrink-0">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              <path d="M5 3v4M19 17v4M3 5h4M17 19h4" />
            </svg>
          </div>
          <div>
            <div className="font-syne font-bold text-xl text-white tracking-tight">
              MessengerX
            </div>
            <div className="text-[10px] tracking-[1.5px] uppercase text-aura-muted font-medium">
              AI Messaging
            </div>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center py-16">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 mb-8 w-fit">
            <svg
              width="12"
              height="12"
              fill="none"
              stroke="#22D3EE"
              stroke-width="2"
              viewBox="0 0 24 24">
              <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z" />
            </svg>
            <span className="text-xs text-aura-sub font-medium tracking-wide">
              Free to join, forever
            </span>
          </div>

          <h1 className="font-syne font-extrabold leading-[1.08] mb-6 text-white text-4xl">
            Start messaging
            <br />
            <span className="grad-text-2">smarter today</span>
          </h1>
          <p className="text-aura-sub leading-relaxed mb-12 max-w-sm">
            Join over 2 million people who use Aura to stay connected with
            AI-powered conversations.
          </p>
        </div>
      </div>
      <RegisterForm />;
    </div>
  );
}
