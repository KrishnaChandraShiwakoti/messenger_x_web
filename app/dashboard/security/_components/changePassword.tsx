"use client";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleUpdatePassword } from "@/lib/actions/auth-action";
import { toast } from "react-toastify";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),

    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

export default function ChangePassword() {
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),

    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof changePasswordSchema>) => {
    setSuccess("");

    try {
      // Replace with your API call
      const response = await handleUpdatePassword(data);

      if (!response.success) {
        throw new Error(response.message || "Update profile failed");
      }

      toast.success("Password updated successfully");
    } catch (error: Error | any) {
      toast.error(error.message || "Password update failed");
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 0 p-8 shadow-xl">
        <div className="mb-8 text-center">
          <p className="mt-2 text-slate-800">Change your password</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Old Password */}

          <div>
            <label className="mb-2 block text-sm text-slate-800">
              Current Password
            </label>

            <input
              type="password"
              placeholder="Enter current password"
              {...register("currentPassword")}
              className={`w-full rounded-lg border bg-slate-400 px-4 py-3 text-black outline-none transition

              ${
                errors.currentPassword
                  ? "border-red-500"
                  : "border-slate-700 focus:border-blue-500"
              }`}
            />

            {errors.currentPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}

          <div>
            <label className="mb-2 block text-sm text-slate-800">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              {...register("newPassword")}
              className={`w-full rounded-lg border bg-slate-400 px-4 py-3 text-black outline-none transition

              ${
                errors.newPassword
                  ? "border-red-500"
                  : "border-slate-700 focus:border-blue-500"
              }`}
            />

            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}

          <div>
            <label className="mb-2 block text-sm text-slate-800">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              {...register("confirmPassword")}
              className={`w-full rounded-lg border bg-slate-400 px-4 py-3 text-black outline-none transition

              ${
                errors.confirmPassword
                  ? "border-red-500"
                  : "border-slate-700 focus:border-blue-500"
              }`}
            />

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {success && (
            <div className="rounded-lg border border-green-500 bg-green-500/20 p-3 text-sm text-green-400">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
            {isSubmitting ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
