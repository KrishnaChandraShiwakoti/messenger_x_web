import Image from "next/image";
import Navbar from "./_components/navbar/navbar";
import appMock from "@/app/assets/images/app_mock.png";
import { Features } from "./constants/landing";
import { Ic, icons } from "./constants/icons";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="w-[90%] mx-auto ">
        {/* Hero */}
        <section id="home" className="flex justify-between  my-6">
          <div className="w-[50%]">
            <h1 className="bg-indigo-200 text-indigo-600 flex max-w-xs justify-center items-center gap-2 rounded-3xl mb-10">
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  background: "#4338ca",
                  flexShrink: 0,
                }}
              />
              Introducing Messaging — Now with AI
            </h1>
            <h1 className="font-serif  text-[clamp(48px,6vw,72px)] leading-[1.05] mb-5.5 tracking-[-1.5px]">
              Messaging with <em className="text-indigo-700 italic">AI</em>{" "}
              built right in
            </h1>
            <p className="text-xl leading-[1.7] mb-9 font-normal max-w-130 text-slate-500">
              The modern messaging platform where conversations are smarter,
              calls are clearer, and your AI assistant is always one tap away.
              Trusted by 2M+ professionals.
            </p>
            <button className="flex items-center gap-2 px-7 py-3.5 rounded-[12px] bg-gradient-to-br from-[#4338CA] to-[#7C3AED] text-white text-[15px] font-bold border-0 cursor-pointer transition-all duration-200 shadow-2xs tracking-[0.2px] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(67,56,202,0.22)]">
              SignUp
            </button>
          </div>
          <div className="mt-8 relative">
            <div className="bg-white rounded-xl shadow-md px-2 py-3 absolute bottom-[-16] left-[-16] border-indigo-600/20 animate-float">
              <p className="text-xs font-medium flex items-center gap-1.5">
                <Ic d={icons.spark} size={12} color="#4338ca" />
                Ai suggestion
              </p>
              <p className="text-xs font-semibold">
                ✦ <span className="italic">“Schedule for 3 PM?”</span> →
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md py-2 px-3 absolute top-[-14] right-[-14] border-indigo-600/20 flex items-center gap-2 animate-float">
              <div
                className="bg-emerald-800"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                }}
              />
              2,847 online now
            </div>
            <Image
              src={appMock}
              alt="App Mock image"
              height={500}
              width={500}
              className="shadow-lg shadow-indigo-500 rounded-3xl"></Image>
          </div>
        </section>
        <section
          id="features"
          className="py-25 bg-surfacepy-[100px]  bg-surface">
          <div className="inline-flex items-center gap-1.75 text-[11px] font-bold tracking-[1.5px] uppercase text-primary mb-4">
            <Ic d={icons.spark} size={13} color="#4338ca" />
            Why MessengerX
          </div>
          <h2 className="font-['Instrument_Serif'] text-[clamp(36px,4vw,52px)] text-text-main leading-[1.1] tracking-[-1px] mb-4">
            Everything you need,
            <br />
            <em className="italic text-primary">nothing you dont</em>
          </h2>
          <p className=" text-[17px] text-text-sub leading-[1.65] max-w-140 font-normal">
            MessengerX strips away complexity and puts powerful AI tools exactly
            where you need them — inside every conversation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-13">
            {Features.map((f) => (
              <div
                key={f.title}
                className="group relative overflow-hidden bg-bg border border-primary/10 rounded-[18px] p-7 transition-all duration-300 cursor-default hover:-translate-y-0.75 hover:border-primary/20 hover:shadow-md]
  ">
                <div
                  className=" w-12 h-12 rounded-[13px] flex items-center justify-center mb-4.5 relative z-1"
                  style={{ background: f.bg }}>
                  <Ic
                    d={icons[f.icon as keyof typeof icons]}
                    size={22}
                    color={f.color}
                  />
                </div>
                <div className=" text-[17px] font-bold text-text-main mb-2 relative z-1">
                  {f.title}
                </div>
                <div className="text-[13.5px] text-text-sub leading-[1.65] relative z-1">
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className=" relative overflow-hidden py-10 px-12 text-center bg-gradient-to-br from-primary to-secondary">
          {/* Background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(255,255,255,0.08)_0%,transparent_70%)]" />

          <h2 className=" relative z-1 font-['Instrument_Serif'] text-[clamp(36px,4vw,52px)]     text-white mb-4 tracking-[-1px]   ">
            Ready to communicate smarter?
          </h2>

          <p className="  relative z-1  text-[17px] text-white/75 mb-8">
            Join 2 million professionals already using MessengerX. Free forever
            for individuals.
          </p>

          <button className=" relative z-1 inline-flex items-center gap-2 px-8 py-3.5 rounded-[12px] bg-white text-primary text-[15px] font-bold cursor-pointer transition-all duration-200 shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)]">
            Get started — it&apos;s free
            <Ic d={icons.chevR} size={16} color="#4338ca" />
          </button>
        </section>
        <footer className="px-12 py-12 border-t border-primary/10 flex items-center justify-between bg-surface">
          <div className="land-logo cursor-default">
            <div className="land-logo-mark">
              <Ic d={icons.spark} size={16} color="white" />
            </div>
            <span className="land-logo-name">MessengerX</span>
          </div>
          <p className="text-[13px] text-text-muted">
            © 2026 MessengerX Technologies. All rights reserved.
          </p>

          <div className="flex gap-6">
            {["Privacy", "Terms", "Security", "Status"].map((l) => (
              <span
                key={l}
                className="text-[13px] text-text-muted cursor-pointer transition-colors duration-150 hover:text-primary">
                {l}
              </span>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
}
