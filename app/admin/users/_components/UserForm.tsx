"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createUserSchema } from "./schema";
import { handleCreateUser } from "@/lib/actions/admin/user-action";

/* ─── Shared field styles (tokens match app/globals.css @theme) ── */
const fieldClass =
  "h-12 w-full rounded-lg border border-hairline-strong bg-surface px-4 text-text-main placeholder:text-text-muted outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15";
const selectFieldClass =
  fieldClass +
  " cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg_xmlns=%27http://www.w3.org/2000/svg%27_width=%2714%27_height=%2714%27_viewBox=%270_0_24_24%27_fill=%27none%27_stroke=%27%23A0A5C8%27_stroke-width=%272%27%3E%3Cpolyline_points=%276_9_12_15_18_9%27/%3E%3C/svg%3E')] bg-[length:14px] bg-[right_14px_center] bg-no-repeat pr-10";
const labelClass =
  "mb-2 block text-xs font-bold uppercase tracking-[1.5px] text-text-sub";
const errClass =
  "mt-1.5 flex items-center gap-1.5 text-xs font-medium text-danger";

/* ─── Small inline icon for error rows ────────────────────────── */
const ErrorIcon = () => (
  <svg
    className="h-3 w-3 flex-shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export default function UserForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<any>({
    resolver: zodResolver(createUserSchema),
  });

  const watchedFullName = watch("fullName", "");

  const onSubmit = (data: any) => {
    setError("");
    startTransition(async () => {
      console.log("Submitting data:", data); // Log the form data for debugging
      try {
        const result = await handleCreateUser({
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          role: data.role,
          password: data.password,
        });
        if (!result.success) throw new Error(result.message);
        toast.success("User created successfully");
        router.push("/admin/users");
        router.refresh();
      } catch (err: any) {
        toast.error(err?.message);
        setError(err?.message || "Something went wrong");
      }
    });
  };

  const initials = watchedFullName
    ?.trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w: string) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="w-full max-w-md font-sans">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Global error banner */}
        {error && (
          <div className="mb-6 flex items-center gap-2.5 rounded-lg border border-danger/25 bg-danger-soft px-4 py-3 text-sm text-danger">
            <svg
              className="h-4 w-4 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}

        {/* Avatar preview strip */}
        <div className="mb-6 flex items-center gap-3.5 rounded-xl border border-hairline bg-surface-2 px-4 py-3.5">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary font-serif text-lg font-bold text-white">
            {initials || "?"}
          </div>
          <div>
            <div className="text-sm font-bold text-text-main">
              {watchedFullName?.trim() || "New user"}
            </div>
            <div className="mt-0.5 text-xs text-text-muted">
              Profile preview · avatar auto-generated
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className={labelClass}>Email</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </span>
            <input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className={`${fieldClass} pl-11`}
              autoComplete="email"
            />
          </div>
          {errors.email && (
            <span className={errClass}>
              <ErrorIcon />
              {errors.email.message as string}
            </span>
          )}
        </div>

        {/* Full name */}
        <div className="mb-5">
          <label className={labelClass}>Full Name</label>
          <input
            type="text"
            {...register("fullName")}
            placeholder="Jane Doe"
            className={fieldClass}
            autoComplete="name"
          />
          {errors.fullName && (
            <span className={errClass}>
              <ErrorIcon />
              {errors.fullName.message as string}
            </span>
          )}
        </div>

        {/* Phone number */}
        <div className="mb-5">
          <label className={labelClass}>Phone Number</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 13.38 19.8 19.8 0 0 1 1 4.76 2 2 0 0 1 2.97 2.74H6a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 10a16 16 0 0 0 6.91 6.91l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17.92z" />
              </svg>
            </span>
            <input
              type="text"
              {...register("phoneNumber")}
              placeholder="9863337701"
              className={`${fieldClass} pl-11`}
              autoComplete="tel"
            />
          </div>
          {errors.phoneNumber && (
            <span className={errClass}>
              <ErrorIcon />
              {errors.phoneNumber.message as string}
            </span>
          )}
        </div>

        {/* Role */}
        <div className="mb-5">
          <label className={labelClass}>Role</label>
          <select
            {...register("role")}
            className={selectFieldClass}
            defaultValue="user">
            <option value="user">User — standard access</option>
            <option value="admin">Admin — full access</option>
          </select>
          {errors.role && (
            <span className={errClass}>
              <ErrorIcon />
              {errors.role.message as string}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className={labelClass}>Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="••••••••"
              className={`${fieldClass} pr-11`}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3.5 top-1/2 flex -translate-y-1/2 items-center text-text-muted transition-colors hover:text-text-main">
              {showPassword ? (
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          {errors.password && (
            <span className={errClass}>
              <ErrorIcon />
              {errors.password.message as string}
            </span>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting || isPending}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white shadow-[var(--shadow-glow)] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0">
          {isPending || isSubmitting ? (
            <>
              <span className="h-4 w-4 animate-spin-fast rounded-full border-2 border-white/30 border-t-white" />
              Creating…
            </>
          ) : (
            <>
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
                aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create user
            </>
          )}
        </button>
      </form>
    </div>
  );
}
