"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "@/lib/api/settings";
import { useAuth } from "@/context/useAuth";
import React from "react";

const profileSchema = z.object({
  firstName: z.string().min(2, "Ad en az 2 karakter olmalı"),
  lastName: z.string().min(2, "Soyad en az 2 karakter olmalı"),
  email: z.string().email("Geçerli bir e‑posta girin"),
  phone: z.string().regex(/^[0-9]{10,11}$/, "Geçerli bir telefon girin"),
  companyName: z.string().min(2, "Şirket adı gerekli"),
});

type ProfileForm = z.infer<typeof profileSchema>;

export default function ProfileCard() {
  const { user, refreshUser, setUser } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      companyName: user?.companyName ?? "",
    },
  });

  // user değiştiğinde formu güncelle
  React.useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        companyName: user.companyName ?? "",
      });
    }
  }, [user, reset]);
  const onSubmit = async (data: ProfileForm) => {
    try {
      await updateProfile(data);
      const updated = await refreshUser(); // ✅ backend’den güncel veriyi çek
      if (updated) {
        reset({
          firstName: updated.firstName ?? "",
          lastName: updated.lastName ?? "",
          email: updated.email ?? "",
          phone: updated.phone ?? "",
          companyName: updated.companyName ?? "",
        });
        setUser(updated);
      }
      alert("Profil bilgileri güncellendi ✅");
    } catch (err) {
      console.error("Update error:", err);
      alert("Profil güncellenirken hata oluştu ❌");
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        <span className="font-bold text-2xl">Kişisel Bilgiler</span>
        <span className="text-sm font-medium text-[#657182]">
          Profil bilgilerinizi güncelleyin
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-10 flex flex-col gap-4">
          <div className="flex gap-x-4">
            <div className="flex-1 flex flex-col gap-2">
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-2">
                    <label className="font-bold">Ad</label>
                    <input
                      {...field}
                      value={field.value ?? ""} // ✅ garanti string
                      className="border border-[#E1ECF5] h-10 rounded-lg pl-2 bg-[#F8FAFC]"
                    />
                    {errors.firstName && (
                      <span className="text-red-500 text-sm">
                        {errors.firstName.message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-2">
                    <label className="font-bold">Soyad</label>
                    <input
                      {...field}
                      value={field.value ?? ""} // ✅ garanti string
                      className="border border-[#E1ECF5] h-10 rounded-lg pl-2 bg-[#F8FAFC]"
                    />
                    {errors.lastName && (
                      <span className="text-red-500 text-sm">
                        {errors.lastName.message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <label className="font-bold">E‑posta</label>
                  <input
                    {...field}
                    value={field.value ?? ""} // ✅ garanti string
                    type="email"
                    className="border border-[#E1ECF5] h-10 rounded-lg pl-2 bg-[#F8FAFC]"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <label className="font-bold">Telefon</label>
                  <input
                    {...field}
                    value={field.value ?? ""} // ✅ garanti string
                    type="text"
                    className="border border-[#E1ECF5] h-10 rounded-lg pl-2 bg-[#F8FAFC]"
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-sm">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <Controller
              name="companyName"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <label className="font-bold">Şirket Adı</label>
                  <input
                    {...field}
                    value={field.value ?? ""} // ✅ garanti string
                    className="border border-[#E1ECF5] h-10 rounded-lg pl-2 bg-[#F8FAFC]"
                  />
                  {errors.companyName && (
                    <span className="text-red-500 text-sm">
                      {errors.companyName.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>

          <button
            type="submit"
            className="flex-1 text-white bg-[#11B4D4] p-3 rounded-xl cursor-pointer"
          >
            Değişiklikleri Kaydet
          </button>
        </div>
      </form>
    </div>
  );
}
