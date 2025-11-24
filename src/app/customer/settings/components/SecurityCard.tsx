"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePassword } from "@/lib/api/settings"; // backend endpoint

// ✅ Zod şema
const schema = z
  .object({
    currentPassword: z.string().min(6, "Mevcut şifre en az 6 karakter olmalı"),
    newPassword: z.string().min(6, "Yeni şifre en az 6 karakter olmalı"),
    confirmPassword: z
      .string()
      .min(6, "Yeni şifre tekrar en az 6 karakter olmalı"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Yeni şifreler eşleşmiyor",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function SecurityCard() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await changePassword(data); // backend çağrısı
      alert("Şifre başarıyla güncellendi ✅");
      reset();
    } catch (err) {
      console.error("Password change error:", err);
      alert("Şifre güncellenirken hata oluştu ❌");
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        <span className="font-bold text-2xl">Şifre Değiştir</span>
        <span className="text-sm font-medium text-[#657182]">
          Hesap güvenliğiniz için düzenli olarak şifrenizi değiştirin
        </span>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex flex-col gap-4"
      >
        <Controller
          name="currentPassword"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label className="font-bold">Mevcut Şifre</label>
              <input
                {...field}
                type="password"
                value={field.value ?? ""}
                className="border border-[#E1ECF5] h-10 rounded-lg pl-2 bg-[#F8FAFC]"
              />
              {errors.currentPassword && (
                <span className="text-red-500 text-sm">
                  {errors.currentPassword.message}
                </span>
              )}
            </div>
          )}
        />

        <Controller
          name="newPassword"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label className="font-bold">Yeni Şifre</label>
              <input
                {...field}
                type="password"
                value={field.value ?? ""}
                className="border border-[#E1ECF5] h-10 rounded-lg pl-2 bg-[#F8FAFC]"
              />
              {errors.newPassword && (
                <span className="text-red-500 text-sm">
                  {errors.newPassword.message}
                </span>
              )}
            </div>
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label className="font-bold">Yeni Şifre (Tekrar)</label>
              <input
                {...field}
                type="password"
                value={field.value ?? ""}
                className="border border-[#E1ECF5] h-10 rounded-lg pl-2 bg-[#F8FAFC]"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          )}
        />

        <button
          type="submit"
          className="flex-1 text-white bg-[#11B4D4] p-3 rounded-xl cursor-pointer"
        >
          Şifreyi Güncelle
        </button>
      </form>
    </div>
  );
}
