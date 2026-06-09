"use client";
import { useForm } from "react-hook-form";
import {
  registerSchema,
  RegisterFormData,
} from "@/app/(auth)/_components/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    // isPending is true during the transition,
    // and false after it finishes
    setError("");
    startTransition(async () => {
      //    try {
      //      const result = ;
      //      if (result.success) {
      //        router.push("/login");
      //      } else {
      //        setError(result.message || "Registration failed");
      //      }
      //    } catch (error: any) {
      //      setError(error?.message || "Registration failed");
      //    }
    });
  };
  return (
    <div className="flex-1 flex items-start justify-center px-6 py-8 relative overflow-y-auto ">
      <div className="absolute top-6 left-6 flex items-center gap-2 ">
        <span
          className="font-syne font-bold text-lg text-white hover:text-aura-p1 transition-colors cursor-pointer"
          onClick={() => router.push("/")}>
          MessengerX
        </span>
      </div>

      <div className="w-full max-w-[460px] animate-fadeUp pt-16 lg:pt-8 pb-8">
        <h2 className="font-syne font-extrabold text-3xl text-white mb-1.5">
          Create your account
        </h2>
        <p className="text-aura-sub text-sm leading-relaxed mb-8">
          Fill in your details to get started. It only takes a minute.
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-aura-sub mb-2">
                First name
              </label>
              <input
                type="text"
                placeholder="Alex"
                className="aura-input w-full bg-aura-surf2 border border-black rounded-2xl px-4 py-3.5 text-[14.5px]  placeholder-aura-muted transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-aura-sub mb-2">
                Last name
              </label>
              <input
                type="text"
                placeholder="Rivera"
                className="aura-input w-full bg-aura-surf2 border border-white/[0.07] rounded-2xl px-4 py-3.5 text-[14.5px]  placeholder-aura-muted transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-aura-sub mb-2">
              Email address
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  width="15"
                  height="15"
                  fill="none"
                  stroke="#454869"
                  stroke-width="1.8"
                  viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <input
                type="email"
                placeholder="alex@example.com"
                className="aura-input w-full bg-aura-surf2 border border-white/[0.07] rounded-2xl pl-11 pr-4 py-3.5 text-[14.5px]  placeholder-aura-muted transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-aura-sub mb-2">
              Phone number
              <span className="text-aura-muted normal-case tracking-normal font-normal ml-1">
                (optional)
              </span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  width="15"
                  height="15"
                  fill="none"
                  stroke="#454869"
                  stroke-width="1.8"
                  viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 13.38 19.79 19.79 0 0 1 1 4.76a2 2 0 0 1 1.97-2H6a2 2 0 0 1 2 1.72 12.74 12.74 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 10a16 16 0 0 0 6.91 6.91l1.27-1.27a2 2 0 0 1 2.11-.45 12.74 12.74 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="aura-input w-full bg-aura-surf2 border border-white/[0.07] rounded-2xl pl-11 pr-4 py-3.5 text-[14.5px]  placeholder-aura-muted transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-aura-sub mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  width="15"
                  height="15"
                  fill="none"
                  stroke="#454869"
                  stroke-width="1.8"
                  viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                id="reg-pw"
                type="password"
                placeholder="Min. 8 characters"
                className="aura-input w-full bg-aura-surf2 border border-white/[0.07] rounded-2xl pl-11 pr-11 py-3.5 text-[14.5px]  placeholder-aura-muted transition-all duration-200"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-aura-muted hover:text-aura-sub transition-colors">
                <svg
                  width="15"
                  height="15"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>
            <div className="mt-2 h-1 rounded-full bg-white/[0.07] overflow-hidden">
              <div id="strength-fill" className="h-full rounded-full w-0"></div>
            </div>
            <p
              id="strength-label"
              className="text-[11px] text-aura-muted mt-1.5"></p>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-aura-sub mb-2">
              Confirm password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  width="15"
                  height="15"
                  fill="none"
                  stroke="#454869"
                  stroke-width="1.8"
                  viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                id="reg-pw2"
                type="password"
                placeholder="••••••••••"
                className="aura-input w-full bg-aura-surf2 border border-white/[0.07] rounded-2xl pl-11 pr-4 py-3.5 text-[14.5px]  placeholder-aura-muted transition-all duration-200"
              />
            </div>
          </div>
        </form>

        <button
          className="bg-aura-p1 hover:bg-aura-p2 hover:cursor-pointer w-full mt-6 rounded-2xl py-3.5 text-[15px] font-semibold  flex items-center justify-center gap-2 text-white"
          type="submit">
          Create Account
          <svg
            width="15"
            height="15"
            fill="none"
            stroke="white"
            stroke-width="2.2"
            viewBox="0 0 24 24">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>

        <p className="text-center text-xs text-aura-muted mt-4">
          By signing up you agree to our
          <a href="#" className="text-indigo-400 hover:underline">
            Terms
          </a>{" "}
          and
          <a href="#" className="text-indigo-400 hover:underline">
            Privacy Policy
          </a>
        </p>
        <p className="text-center mt-4 text-sm text-aura-sub">
          Already have an account?
          <button
            className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors ml-1"
            onClick={() => router.push("/login")}>
            Sign in →
          </button>
        </p>
      </div>
    </div>
  );
}
