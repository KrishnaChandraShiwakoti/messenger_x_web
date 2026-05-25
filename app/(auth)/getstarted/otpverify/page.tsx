"use client";

import { T } from "@/app/constants/theme";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <div className=" min-h-screen flex bg-bg">
      <div className="flex-1 flex items-center justify-center p-10 bg-surface">
        <div className="w-full max-w-105">
          <div className="text-[11px] font-bold tracking-[1.5px] uppercase text-primary mb-2.5">
            Step 2 of 3
          </div>
          <h2 className="font-['Instrument_Serif'] text-[36px] tracking-[-0.8px] text-text-main mb-2 leading-[1.1]">
            Enter the code
          </h2>
          <p className="text-[14px] text-text-sub mb-7 leading-[1.6]">
            We sent a 6-digit code to{" "}
            <span style={{ fontWeight: 700, color: T.primary }}>
              {/* {maskedPhone} */}
            </span>{" "}
            via sms
          </p>

          {/* Demo hint */}
          <div
            style={{
              display: "flex",
              gap: 8,
              padding: "10px 12px",
              borderRadius: 10,
              marginBottom: 18,
              background: "rgba(217,119,6,0.08)",
              border: "1px solid rgba(217,119,6,0.2)",
              fontSize: 12.5,
              color: T.warning,
            }}>
            <span>💡</span>
            <span>
              Demo mode — any 6 digits work. Try <strong>123456</strong>
            </span>
          </div>

          {/* OTP input */}
          <div
            className="flex gap-3.5"
            style={{ position: "relative", marginBottom: 14 }}
            onClick={() => {}}>
            <input
              className="w-14 flex h-14 rounded-xl bg-surface-2 border flex-1 items-center justify-center font-bold text-text-main cursor-text "
              type="tel"
              inputMode="numeric"
              maxLength={1}
              autoFocus
            />
            <input
              className="w-14 flex h-14 rounded-xl bg-surface-2 border flex-1 items-center justify-center font-bold text-text-main cursor-text"
              type="tel"
              inputMode="numeric"
              maxLength={1}
              autoFocus
            />{" "}
            <input
              className="w-14 flex h-14 rounded-xl bg-surface-2 border flex-1 items-center justify-center font-bold text-text-main cursor-text"
              type="tel"
              inputMode="numeric"
              maxLength={1}
              autoFocus
            />{" "}
            <input
              className="w-14 flex h-14 rounded-xl bg-surface-2 border flex-1 items-center justify-center font-bold text-text-main cursor-text"
              type="tel"
              inputMode="numeric"
              maxLength={1}
              autoFocus
            />{" "}
            <input
              className="w-14 flex h-14 rounded-xl bg-surface-2 border flex-1 items-center justify-center font-bold text-text-main cursor-text"
              type="tel"
              inputMode="numeric"
              maxLength={1}
              autoFocus
            />
            <input
              className="w-14 flex h-14 rounded-xl bg-surface-2 border flex-1 items-center justify-center font-bold text-text-main cursor-text"
              type="tel"
              inputMode="numeric"
              maxLength={1}
              autoFocus
            />
            {/* <div className="flex gap-2.5 mb-4.5">
              {otp.map((digit, i) => (
                <div
                  key={i}
                  className={[
                    "flex h-14 rounded-xl bg-surface-2 border flex-1 items-center justify-center font-bold text-text-main cursor-text ",
                  ]
                    .filter(Boolean)
                    .join(" ")}></div>
              ))}
            </div> */}
          </div>

          {/* <div className="resend-row">
            {countRunning ? (
              <>
                Resend code in{" "}
                <span className="resend-timer">{countdown}s</span>
              </>
            ) : (
              <>
                Didn't get it?{" "}
                <span
                  className="resend-link"
                  onClick={() => {
                    startCount();
                    otpRef.current?.focus();
                  }}>
                  Resend code
                </span>
              </>
            )}
          </div> */}

          <button
            className="w-full px-3.5 py-3.5 rounded-[12px] bg-gradient-to-br from-primary to-secondary text-white text-[15px] font-bold cursor-pointer transition-all duration-200 shadow-[0_4px_16px_rgba(67,56,202,0.22)] tracking-[0.2px] flex items-center justify-center gap-2 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(67,56,202,0.22)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            onClick={() => {
              router.push("/getstarted/profile");
            }}
            style={{ marginBottom: 12 }}>
            Verify
            {/* {verifying ? <div className="spinner" /> : "Verify"} */}
          </button>

          <p style={{ textAlign: "center", fontSize: 13, color: T.textSub }}>
            Wrong number?{" "}
            <span
              style={{ color: T.primary, fontWeight: 700, cursor: "pointer" }}
              onClick={() => router.push("/getstarted")}>
              Change it
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
