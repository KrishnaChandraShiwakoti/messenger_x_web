/* eslint-disable react-hooks/refs */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useState, useRef } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { handleUpdateProfile } from "@/lib/actions/auth-action";

import { z } from "zod";
import { useRouter } from "next/navigation";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
console.log(process.env.NEXT_PUBLIC_API_URL);
// console.log(user.imageUrl);

export const updateUserSchema = z.object({
  fullName: z.string().min(2, { message: "Minimum 2 characters" }),
  email: z.string(),
  phoneNumber: z.string().min(10, { message: "Minimum 10 characters" }),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: "Max file size is 5MB",
    })
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg, .png and .webp formats are supported",
    }),
});
export type UpdateUserData = z.infer<typeof updateUserSchema>;

export default function UpdateUserForm({ user }: { user: any }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserData>({
    resolver: zodResolver(updateUserSchema),
    values: {
      fullName: user?.fullName || "",
      phoneNumber: user?.phoneNumber || "",
      email: user?.email || "",
    },
  });

  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleImageChange = (
    file: File | undefined,
    onChange: (file: File | undefined) => void,
  ) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
    onChange(file);
  };

  const handleDismissImage = (onChange?: (file: File | undefined) => void) => {
    setPreviewImage(null);
    onChange?.(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: UpdateUserData) => {
    setError(null);
    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("email", data.email);
      if (data.image) {
        formData.append("profileImage", data.image);
      }
      const response = await handleUpdateProfile(formData);
      if (!response.success) {
        throw new Error(response.message || "Update profile failed");
      }

      handleDismissImage();
      toast.success("Profile updated successfully");
    } catch (error: Error | any) {
      toast.error(error.message || "Profile update failed");
      setError(error.message || "Profile update failed");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {error && <p className="text-sm text-red-600">{error}</p>}

        {/* Profile Image Display */}
        <div className="mb-4">
          {previewImage ? (
            <div className="relative w-24 h-24">
              <img
                src={previewImage}
                alt="Profile Image Preview"
                className="w-24 h-24 rounded-full object-cover"
              />
              <Controller
                name="image"
                control={control}
                render={({ field: { onChange } }) => (
                  <button
                    type="button"
                    onClick={() => handleDismissImage(onChange)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600">
                    ✕
                  </button>
                )}
              />
            </div>
          ) : user.profilePicture && user?.profilePicture ? (
            <Image
              src={process.env.NEXT_PUBLIC_API_URL + user.profilePicture}
              alt="Profile Image"
              width={100}
              height={100}
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600">No Image</span>
            </div>
          )}
        </div>

        {/* Profile Image Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Profile Image
          </label>
          <Controller
            name="image"
            control={control}
            render={({ field: { onChange } }) => (
              <input
                ref={fileInputRef}
                type="file"
                onChange={(e) =>
                  handleImageChange(e.target.files?.[0], onChange)
                }
                accept=".jpg,.jpeg,.png,.webp"
              />
            )}
          />
          {errors.image && (
            <p className="text-sm text-red-600">{errors.image.message}</p>
          )}
        </div>
        {/* First Name Input */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="fullName">
            Name
          </label>
          <input
            id="fullName"
            type="text"
            {...register("fullName")}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.fullName && (
            <p className="text-sm text-red-600">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="text"
            {...register("phoneNumber")}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.phoneNumber && (
            <p className="text-sm text-red-600">{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
          {isSubmitting ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
