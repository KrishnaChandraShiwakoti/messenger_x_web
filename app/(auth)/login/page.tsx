import LoginFormZod from "../_components/loginFormZod";

export default function Page() {
  return (
    <div id="screen-login" className="relative z-10 min-h-screen flex">
      <div
        className="hidden lg:flex lg:w-[48%] xl:w-[52%] relative flex-col justify-between p-14 noise overflow-hidden  bg-[linear-gradient(160deg,#0C0A1E_0%,#110E28_55%,#090B1A_100%)]
         border-r border-r-white/6">
        <div className="absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full pointer-events-none"></div>

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-11 h-11 rounded-2xl btn-grad flex items-center justify-center animate-glow flex-shrink-0">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round">
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
            <div className="w-1.5 h-1.5 rounded-full bg-aura-success animate-pulse2"></div>
            <span className="text-xs text-aura-sub font-medium tracking-wide">
              2M+ people connected
            </span>
          </div>

          <h1 className="font-syne font-extrabold leading-[1.08] mb-6 text-white text-4xl">
            Messages that
            <br />
            <span className="grad-text">think with you</span>
          </h1>
          <p className="text-aura-sub leading-relaxed mb-12 max-w-sm">
            MessengerX brings AI natively into every conversation — smart
            replies, live translation, tone detection, and crystal-clear calls,
            all in one place.
          </p>

          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <div className="flex items-center gap-3 glass border border-white/[0.07] rounded-2xl px-4 py-3 flex-1 hover:border-indigo-500/30 transition-colors duration-300">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24">
                    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Smart Replies
                  </div>
                  <div className="text-xs text-aura-muted mt-0.5">
                    Context-aware suggestions
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 glass border border-white/[0.07] rounded-2xl px-4 py-3 flex-1 hover:border-violet-500/30 transition-colors duration-300">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M12 2v4M8 7h8" />
                    <circle cx="9" cy="15" r="1" />
                    <circle cx="15" cy="15" r="1" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    AI Assistant
                  </div>
                  <div className="text-xs text-aura-muted mt-0.5">
                    Summarize &amp; translate
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 glass border border-white/[0.07] rounded-2xl px-4 py-3 hover:border-cyan-500/20 transition-colors duration-300">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  HD Video Calls
                </div>
                <div className="text-xs text-aura-muted mt-0.5">
                  AI noise cancellation built in — crystal clear, every time
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8 relative z-10">
          <div>
            <div className="font-syne font-bold text-xl text-white">2M+</div>
            <div className="text-[10px] uppercase tracking-widest text-aura-muted mt-0.5">
              Users
            </div>
          </div>
          <div className="w-px h-7 bg-white/10"></div>
          <div>
            <div className="font-syne font-bold text-xl text-white">140+</div>
            <div className="text-[10px] uppercase tracking-widest text-aura-muted mt-0.5">
              Countries
            </div>
          </div>
          <div className="w-px h-7 bg-white/10"></div>
          <div>
            <div className="font-syne font-bold text-xl text-white">99.9%</div>
            <div className="text-[10px] uppercase tracking-widest text-aura-muted mt-0.5">
              Uptime
            </div>
          </div>
        </div>
      </div>
      <div className="bg-aura-surface h-screen w-full flex items-center justify-center">
        <LoginFormZod />
      </div>
    </div>
  );
}
