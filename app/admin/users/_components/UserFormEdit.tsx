"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import { editUserSchema } from "./schema";
import { handleUpdateUser } from "@/lib/actions/admin/user-action";

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

/* ─── Inline icons ─────────────────────────────────────────────── */
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
export default function UserFormEdit({ user }: { user?: any }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<any>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      role: user?.role || "user",
      password: "",
    },
  });

  const onSubmit = (data: any) => {
    setError("");
    startTransition(async () => {
      try {
        console.log("submitting data:" + JSON.stringify(data));

        const formdata = new FormData();
        formdata.append("fullName", data.fullName || "");
        formdata.append("email", data.email || "");
        formdata.append("phoneNumber", data.phoneNumber || "");
        formdata.append("role", data.role || "user");
        const result = await handleUpdateUser(user._id, formdata);

        if (!result.success) throw new Error(result.message);
        toast.success("User updated successfully");
        router.push("/admin/users");
        router.refresh();
      } catch (err: any) {
        console.error("Error updating user:", err);
        toast.error(err?.message);
        setError(err?.message || "Something went wrong");
      }
    });
  };

  return (
    <div className="w-full max-w-md font-sans">
      <form
        onSubmit={handleSubmit(onSubmit, (errors) =>
          console.log("Validation errors:", errors),
        )}>
        {/* Global error banner */}
        {error && (
          <div className="mb-6 flex items-center gap-2.5 rounded-lg border border-danger/25 bg-danger-soft px-4 py-3 text-sm text-danger">
            <svg
              className="h-4 w-4 shrink-0"
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

        {/* ── Avatar block ── */}
        <div className="mb-6 flex items-center gap-4 rounded-xl border border-hairline bg-surface-2 px-4 py-4">
          <div className="relative shrink-0">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-primary to-secondary font-serif text-2xl font-bold text-white ring-2 ring-surface-3">
              {(user?.fullName?.[0] ?? "") || "?"}
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold text-text-main">
              {user?.fullName ? user?.fullName : "Edit profile photo"}
            </div>
            <div className="mt-1 text-xs text-text-muted">
              Admin Cannot change user profile picture. Only user can change
              their profile picture.
            </div>

            {errors.image && (
              <span className={errClass}>
                <ErrorIcon />
                {errors.image.message as string}
              </span>
            )}
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

        {/* Full Name */}
        <div className="mb-5">
          <label className={labelClass}>Full Name</label>
          <input
            type="text"
            {...register("fullName")}
            placeholder="Jane Doe"
            className={fieldClass}
            autoComplete="given-name"
          />
          {errors.fullName && (
            <span className={errClass}>
              <ErrorIcon />
              {errors.fullName.message as string}
            </span>
          )}
        </div>

        {/* Phone Number */}
        <div className="mb-5">
          <label className={labelClass}>Phone Number</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-text-muted">
              +
            </span>
            <input
              type="text"
              {...register("phoneNumber")}
              placeholder="123-456-7890"
              className={`${fieldClass} pl-8`}
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
          <select {...register("role")} className={selectFieldClass}>
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
          <label className={labelClass}>
            Password
            <span className="ml-1.5 normal-case font-medium text-text-muted">
              (leave blank to keep current)
            </span>
          </label>
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
              Saving…
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
                strokeLinejoin="round"
                aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Save changes
            </>
          )}
        </button>
      </form>
    </div>
  );
}
