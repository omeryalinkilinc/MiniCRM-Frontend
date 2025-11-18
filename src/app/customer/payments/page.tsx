"use client";
import Layout from "@/app/components/Layout";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { useAuth } from "@/app/hooks/useAuth";
import React, { useEffect, useState } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import { getCurrentUser } from "@/lib/api/auth";
import {
  ExclamationCircleIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Input, Checkbox, Select } from "@mantine/core";
import Link from "next/link";
import { PaymentContent } from "./components/PaymentContent";
import { useForm, Controller, FormProvider } from "react-hook-form";

type FormValues = {
  method: string;
  amount: number;
  description: string;
  cardNumber?: string;
  cardHolder?: string;
  expiry?: string;
  cvv?: string;
};

const page = () => {
  const [user, setUser] = useState<{
    fullName: string;
    email: string;
    company: string;
    customerType: string;
  } | null>(null);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch((err) => console.error(err));
  }, []);

  const [today, setToday] = useState("");

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setToday(formatted);
  }, []);

  const methods = useForm<FormValues>({
    defaultValues: { method: "", amount: 0, description: "" },
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const selectedMethod = watch("method");

  const onSubmit = (data: FormValues) => {
    console.log("Seçilen ödeme yöntemi:", data.method);
    console.log("Girilen tutar:", data.amount);
    console.log("Açıklama:", data.description);
    // Burada backend'e gönderme işlemi yapılabilir
  };

  const descriptionValue = watch("description") || "";
  const wordCount = descriptionValue.trim()
    ? descriptionValue.trim().split(/\s+/).length
    : 0;
  const remainingWords = 250 - wordCount;

  const { role, loading } = useAuth();
  if (loading || !role) return null;
  return (
    <Layout role={role}>
      <ProtectedRoute allowed={["customer"]}>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="flex-[2] ">
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex items-center gap-4 bg-[#fff] p-4 rounded-lg border border-[#11b4d433]">
                    <span className="bg-[#11b4d41a] rounded-full p-2">
                      <UserIcon className="w-7 h-7 text-sky-500" />
                    </span>
                    <div>
                      <span className="font-medium">{user?.fullName}</span>
                      <div className="flex gap-2">
                        <span className="text-[#65758b] text-sm">
                          {user?.company}
                        </span>
                        <span className="text-sm text-gray-400">•</span>
                        <span className="text-[#65758b] text-sm">
                          {user?.customerType}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 bg-[#fff] p-4 rounded-lg border border-[#11b4d433]">
                    <div>
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-lg">
                          Yeni Ödeme İşlemi
                        </span>
                        <span className="text-sm text-[#65758b]">
                          Ödeme bilgilerinizi güvenli bir şekilde girerek
                          işleminizi tamamlayabilirsiniz.
                        </span>
                      </div>

                      <div className="flex gap-2 items-center bg-[#F3FBFD] p-4 rounded-lg border border-[#11b4d433] mt-4">
                        <span>
                          <ExclamationCircleIcon className="w-6 h-6 text-[#11b4d4]" />
                        </span>
                        <span className="text-sm">
                          Bu işlem hesabınıza kayıtlı olarak oluşturulacaktır.
                          İşlem sonrası fatura ve dekont bilgilerine
                          erişebilirsiniz
                        </span>
                      </div>

                      <div className="mt-4">
                        <div className="flex gap-1 items-center">
                          <span>
                            <ExclamationCircleIcon className="w-6 h-6 text-[#11b4d4]" />
                          </span>
                          <span className="font-medium">Ödeme Bilgileri</span>
                        </div>
                        <div className="border border-[#e1e7ef] h-[1px] mt-2"></div>
                        <div className="mt-4 flex flex-col gap-1">
                          <label className="font-medium text-sm">Tutar*</label>
                          <Controller
                            name="amount"
                            control={control}
                            rules={{
                              required: "Lütfen bir tutar giriniz.",
                              min: {
                                value: 10,
                                message: "Minimum tutar ₺10,00 olmalıdır.",
                              },
                              max: {
                                value: 100000,
                                message: "Maksimum tutar ₺100.000,00 olabilir.",
                              },
                            }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                type="number"
                                placeholder="0,00"
                                className="w-full bg-[#F8FAFC] rounded-lg"
                                error={errors.amount?.message}
                              />
                            )}
                          />

                          <span className="text-xs text-[#65758b]">
                            Minimum: ₺10,00 - Maximum: ₺100.000,00
                          </span>
                        </div>
                        <div className="mt-4 flex flex-col gap-1">
                          <label className="font-medium text-sm">
                            Açıklama *
                          </label>

                          <Controller
                            name="description"
                            control={control}
                            rules={{
                              required: "Lütfen bir açıklama giriniz",
                              validate: (value) => {
                                const wordCount = value
                                  .trim()
                                  .split(/\s+/).length;
                                return (
                                  wordCount <= 250 ||
                                  "En fazla 250 kelime girebilirsiniz."
                                );
                              },
                            }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="Ödeme ile ilgili açıklama giriniz..."
                                type="text"
                                className="w-full bg-[#F8FAFC] rounded-lg"
                                error={errors.description?.message}
                              />
                            )}
                          />
                          <span
                            className={`text-xs ${
                              remainingWords < 0
                                ? "text-red-500"
                                : "text-[#65758b]"
                            }`}
                          >
                            Kalan kelime:{" "}
                            {remainingWords < 0 ? 0 : remainingWords}
                          </span>
                        </div>
                      </div>

                      <div className="mt-6">
                        <div className="">
                          <label className="font-medium text-sm">
                            Ödeme Yöntemi *
                          </label>
                          <Controller
                            name="method"
                            control={control}
                            rules={{
                              required: "Lütfen bir ödeme yöntemi seçiniz.",
                            }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                placeholder="Ödeme yöntemi seçiniz"
                                data={["Kredi Kartı", "Havale/EFT", "Bakiye"]}
                                radius="md"
                                size="sm"
                                clearable={false}
                                error={errors.method?.message}
                              />
                            )}
                          />
                        </div>

                        {/* Seçilen yönteme göre içerik */}
                        <div className="mt-6">
                          <PaymentContent method={selectedMethod} />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-4 w-full">
                      <div className="flex flex-col gap-1 w-full">
                        <label className="font-medium text-sm">
                          İşlem Tarihi
                        </label>
                        <input
                          type="text"
                          value={today}
                          readOnly
                          className="w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-md px-4 py-2 cursor-not-allowed"
                        />
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        <label className="font-medium text-sm">Durum</label>
                        <input
                          type="text"
                          readOnly
                          className="w-full  bg-gray-100 border border-gray-300 rounded-md px-4 py-2 cursor-not-allowed"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 items-center bg-[#FCFDFE] p-4 rounded-lg border border-[#11b4d433] mt-4">
                      <span>
                        <Checkbox defaultChecked radius="xl" />
                      </span>
                      <span className="text-sm">
                        <Link
                          href="#"
                          className="text-[#11b4d4] hover:underline"
                        >
                          {" "}
                          KVKK Aydınlatma Metni
                        </Link>
                        'ni ve
                        <Link
                          href="#"
                          className="text-[#11b4d4] hover:underline"
                        >
                          {" "}
                          Ödeme Koşulları{" "}
                        </Link>
                        'nı okudum, kabul ediyorum.
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center gap-4 items-center bg-[#FCFDFE] p-4 rounded-lg border border-[#11b4d433] mt-4">
                    <div className="flex items-center gap-1">
                      <span>
                        <ShieldCheckIcon className="w-6 h-6 text-green-500" />
                      </span>
                      <span className="text-sm font-medium text-[#65758b]">
                        256-bit SSL
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <span>
                        <LockClosedIcon className="w-6 h-6 text-blue-500" />
                      </span>
                      <span className="text-sm font-medium text-[#65758b]">
                        3D Secure
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <span>
                        <CheckCircleIcon className="w-6 h-6 text-teal-500" />{" "}
                      </span>
                      <span className="text-sm font-medium text-[#65758b]">
                        PCI DSS Uyumlu
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 items-center mt-4">
                    <button className="p-2 border border-[#e1e7ef] rounded-lg cursor-pointer w-auto bg-[#f8fafc] ">
                      İptal Et
                    </button>
                    <button
                      className="flex-1 bg-[#11b4d4] text-white p-2 rounded-lg cursor-pointer"
                      type="submit"
                    >
                      Ödemeyi Başlat
                    </button>
                  </div>
                </form>
              </FormProvider>
            </div>

            <div className="flex-[1]  bg-[#fff] p-4 rounded-lg border border-[#11b4d433]">
              <div>
                <div>
                  <span className="font-medium">Ödeme Özeti</span>
                </div>

                <div className="mt-4 flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[#65758b] text-sm">Ara Toplam</span>
                    <span className="font-medium">₺ 0,00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#65758b] text-sm">KDV</span>
                    <span className="font-medium">₺ 0,00</span>
                  </div>
                </div>
                <div className="border border-[#e1e7ef] h-[1px] mt-2"></div>
                <div className="mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Toplam Tutar</span>
                    <span className="text-lg text-[#11b4d4] font-bold">
                      ₺ 0,00
                    </span>
                  </div>
                  <div className="p-4 mt-4">
                    <ol className="list-disc">
                      <li className="text-sm text-[#65758b]">
                        Tüm ücretler KDV dahildir
                      </li>
                      <li className="text-sm text-[#65758b]">
                        Fatura işlem sonrası otomatik oluşturulacaktır
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </Layout>
  );
};

export default page;
