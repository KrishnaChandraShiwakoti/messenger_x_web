"use client";

import { Ic, icons } from "@/app/constants/icons";
import { T } from "@/app/constants/theme";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DetailsData, detailsSchema } from "./schema";
import { useRouter } from "next/navigation";
export default function DeatilsFormZod() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DetailsData>({
    resolver: zodResolver(detailsSchema),
  });
  const router = useRouter();
  const onSubmit = () => {
    router.push("/dashboard");
  };
  return (
    <div className="min-h-screen flex bg-bg">
      <div className="flex-1 flex items-center justify-center p-10 bg-surface">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-105">
          <div className="text-[11px] font-bold tracking-[1.5px] uppercase text-primary mb-2.5">
            Step 3 of 3
          </div>
          <h2 className="font-['Instrument_Serif'] text-[36px] tracking-[-0.8px] text-text-main mb-2 leading-[1.1]">
            Set up your profile
          </h2>
          <p className="ext-[14px] text-text-sub mb-7 leading-[1.6]">
            This info will be visible to people you message. You can change it
            later.
          </p>

          <div className="group relative w-22 h-22 rounded-full cursor-pointer mx-auto mb-5">
            <div className="w-full h-full rounded-full bg-surface-2 border-2 border-primary/20 flex items-center justify-center overflow-hidden transition-all duration-200 group-hover:border-primary group-hover:bg-surface-3">
              <Ic d={icons.user} size={36} color={T.textMuted} />
            </div>
            <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-primary flex items-center justify-center border-2 border-surface">
              <Ic d={icons.camera} size={13} color="white" />
            </div>
          </div>

          <input
            className=" w-full bg-surface-2 border-[1.5px] border-primary/20 rounded-[12px] px-[14px] py-[13px] text-[15px] text-text-main outline-none transition-all duration-200 mb-[12px] placeholder:text-text-muted focus:border-primary focus:ring-3 focus:ring-primary/10 focus:bg-surface"
            placeholder="Your name"
            {...register("name", { required: "Name is Required" })}
            autoFocus
          />
          {errors.name && <span className="ml-3">{errors.name.message}</span>}
          <textarea
            className=" w-full bg-surface-2 border-[1.5px] border-primary/20 rounded-[12px] px-3.5 py-3.25 text-[15px] text-text-main outline-none transition-all duration-200 mb-3 placeholder:text-text-muted focus:border-primary focus:ring-3 focus:ring-primary/10 focus:bg-surface"
            placeholder="About (e.g. Available · Hey there, I'm using Aura!)"
            {...register("about", { required: "Name is Required" })}
            rows={3}
            style={{ lineHeight: 1.55 }}
          />
          {errors.about && <span className="ml-3">{errors.about.message}</span>}
          <div className=" flex gap-2.5 px-3.5 py-3 bg-surface-2 border border-primary/10 rounded-[10px] text-[13px] text-text-sub leading-[1.55] mb-4 items-center">
            <Ic d={icons.shield} size={15} color={T.primary} />
            <span>
              Your name and photo are visible to your contacts and anyone you
              message.
            </span>
          </div>

          <button
            className="w-full px-3.5 py-3.5 rounded-[12px] bg-gradient-to-br from-primary to-secondary text-white text-[15px] font-bold cursor-pointer transition-all duration-200 shadow-[0_4px_16px_rgba(67,56,202,0.22)] tracking-[0.2px] flex items-center justify-center gap-2 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(67,56,202,0.22)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            type="submit"
            disabled={isSubmitting}>
            {isSubmitting ? <div className="spinner" /> : "Continue →"}
          </button>
        </form>
      </div>
    </div>
  );
}
