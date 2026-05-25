"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { phoneNumberData, phoneNumberSchema } from "./schema";
import { Ic, icons } from "@/app/constants/icons";
import { T } from "@/app/constants/theme";
import { useRouter } from "next/navigation";
export default function PhoenFormZod() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<phoneNumberData>({
    resolver: zodResolver(phoneNumberSchema),
  });
  const router = useRouter();
  const onSubmit = () => {
    router.push("/getstarted/otpverify");
  };
  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex-1 flex items-center justify-center p-10 bg-surface">
          <div className=" w-full max-w-105">
            <div className=" text-[11px] font-bold tracking-[1.5px] uppercase text-primary mb-2.5">
              Step 1 of 3
            </div>
            <h2 className="font-['Instrument_Serif'] text-[36px] tracking-[-0.8px] text-text-main mb-2 leading-[1.1]">
              Your phone number
            </h2>
            <p className="text-[14px] text-text-sub mb-7 leading-[1.6]">
              Aura uses your phone number to verify your identity. No password
              needed.
            </p>
            <div className="relative">
              <div
                className={` border-[1.5px] border-primary/20 rounded-[14px] overflow-hidden bg-surface transition-all duration-200 mb-3.5`}>
                <div className="flex items-center gap-2.5 px-4 py-3 border-b border-primary/10 cursor-pointer transition-colors duration-100 select-none hover:bg-surface-2 ">
                  <span style={{ fontSize: 22 }}>NP</span>
                  <span className="text-[14px] font-medium text-text-main">
                    Nepal
                  </span>
                </div>
                <div className="flex items-center px-4">
                  <span className=" text-[15px] font-bold text-text-main py-3 pr-3 border-r border-primary/10 mr-3 whitespace-nowrap shrink-0">
                    +977
                  </span>
                  <input
                    className="flex-1 bg-transparent border-none outline-none text-[15px] font-medium text-text-main py-3 placeholder:text-text-muted placeholder:font-normal"
                    type="tel"
                    placeholder="Phone number"
                    {...register("phone", { required: "Phone is required" })}
                    autoFocus
                  />
                </div>
                {errors.phone && (
                  <span className="ml-3">{errors.phone.message}</span>
                )}
              </div>

              <div className=" flex gap-2.5 px-3.5 py-3 bg-surface-2 border border-primary/10 rounded-[10px] text-[13px] text-text-sub leading-[1.55] mb-4 justify-center items-center">
                <Ic d={icons.lock} size={15} color={T.primary} />
                <span>
                  Aura encrypts your number and never shares it with third
                  parties or advertisers.
                </span>
              </div>

              <button
                className="w-full px-3.5 py-3.5 rounded-[12px] bg-gradient-to-br from-primary to-secondary text-white text-[15px] font-bold cursor-pointer transition-all duration-200 shadow-[0_4px_16px_rgba(67,56,202,0.22)] tracking-[0.2px] flex items-center justify-center gap-2 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(67,56,202,0.22)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                //   onClick={}
                //   disabled={}
                type="submit"
                style={{ marginBottom: 12 }}>
                {isSubmitting ? (
                  <div className=" w-4.5  h-4.5 rounded-full border-[2.5px] border-white/30 border-t-white animate-spin-fast" />
                ) : (
                  <>Next →</>
                )}
              </button>
              <p
                style={{
                  textAlign: "center",
                  fontSize: 12.5,
                  //  color: T.textMuted,
                  lineHeight: 1.6,
                }}>
                By continuing you agree to our{" "}
                <span style={{ fontWeight: 600, cursor: "pointer" }}>
                  Terms
                </span>{" "}
                &amp;{" "}
                <span style={{ fontWeight: 600, cursor: "pointer" }}>
                  Privacy Policy
                </span>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
