"use client";

import { Ic, icons } from "@/app/constants/icons";
import { STEP_LABELS, STEP_NUMS, type StepKey } from "@/app/constants/landing";
import { T } from "@/app/constants/theme";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const step: StepKey = pathname.includes("/otpverify")
    ? "otp"
    : pathname.includes("/profile")
      ? "profile"
      : "phone";
  return (
    <section className="min-h-screen grid lg:grid-cols-[1fr_1.1fr]">
      <div className=" shrink-0 flex flex-col items-center justify-center px-15 py-15 relative overflow-hidden border-r border-primary/10 bg-[linear-gradient(160deg,#EEF0FF_0%,#F3EEFF_50%,#EDF5FF_100%)]">
        <div
          className="absolute rounded-full blur-[60px] pointer-events-none"
          style={{
            width: 400,
            height: 400,
            top: "-20%",
            left: "-20%",
            background: "rgba(67,56,202,0.10)",
          }}
        />
        <div
          className="absolute rounded-full blur-[60px] pointer-events-none"
          style={{
            width: 280,
            height: 280,
            bottom: "-10%",
            right: "-10%",
            background: "rgba(124,58,237,0.08)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div
            className="bg-linear-to-r from-primary to-secondary shadow-2xs shadow-primary"
            style={{
              width: 80,
              height: 80,
              borderRadius: 22,
              margin: "0 auto 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              //   boxShadow: `0 16px 40px ${T.primaryGlow}`,
            }}>
            <Ic d={icons.spark} size={40} color="white" />
          </div>
          <div
            className="text-text-main"
            style={{
              fontFamily: "'Instrument Serif',serif",
              fontSize: 32,
              marginBottom: 8,
            }}>
            Aura
          </div>
          <p
            className="text-text-sub"
            style={{
              fontSize: 14,
              lineHeight: 1.7,
              maxWidth: 260,
            }}>
            The AI-powered messaging platform trusted by millions worldwide.
          </p>
          {/* Steps indicator */}
          <div
            style={{
              marginTop: 36,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              textAlign: "left",
            }}>
            {(Object.entries(STEP_LABELS) as [StepKey, string][]).map(
              ([k, lbl]) => {
                const curr = STEP_NUMS[step];
                const num = STEP_NUMS[k];
                const done = curr > num;
                const active = curr === num;
                return (
                  <div
                    key={k}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 14px",
                      borderRadius: 11,
                      background: active
                        ? T.primarySoft
                        : done
                          ? T.successSoft
                          : "transparent",
                      border: active
                        ? `1px solid ${T.border2}`
                        : done
                          ? `1px solid ${T.success}22`
                          : "1px solid transparent",
                      transition: "all 0.3s",
                    }}>
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 8,
                        background: done
                          ? T.success
                          : active
                            ? T.primary
                            : T.surface4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 700,
                        color: "white",
                        flexShrink: 0,
                        transition: "all 0.3s",
                      }}>
                      {done ? "✓" : num}
                    </div>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: active ? 700 : 500,
                        color: active ? T.text : done ? T.success : T.textMuted,
                      }}>
                      {lbl}
                    </span>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </div>
      <div className="auth-right">{children}</div>
    </section>
  );
}
