"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-hot-toast";

const page = () => {
  const [loading, setLoading] = useState(false);

  const schema = yup.object({
    fullName: yup.string().required("Ad Soyad zorunlu"),
    email: yup
      .string()
      .email("Geçerli bir e-posta girin")
      .required("E-posta zorunlu"),
    password: yup
      .string()
      .min(6, "Şifre en az 6 karakter olmalı")
      .required("Şifre zorunlu"),
    company: yup.string().required("Şirket ismi zorunlu"),
    customerType: yup
      .string()
      .required("Müşteri tipi zorunlu")
      .oneOf(
        ["KOBI", "Bireysel", "Kurumsal"],
        "Geçerli bir müşteri tipi seçin"
      ),
  });

  type RegisterFormData = {
    fullName: string;
    email: string;
    password: string;
    company: string;
    customerType: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const res = await fetch("http://localhost:5270/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Kayıt başarılı!");
        router.push("/");
      } else {
        setError("email", {
          type: "manual",
          message: result.message || "Kayıt başarısız",
        });
      }
    } catch (error) {
      setError("email", {
        type: "manual",
        message: "Bir hata oluştu. Lütfen tekrar deneyin.",
      });
    }
  };

  return (
    <div className="flex justify-center h-screen items-center bg-[#f2f5fd] font-sans">
      <div>
        <div className="border border-[#fff] p-5 rounded-xl mt-6 w-[450px] bg-[#fff] shadow-card">
          <div className=" flex justify-center items-center">
            <div className="relative mr-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M19.875 6.27a2.225 2.225 0 0 1 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z" />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-blue-500 absolute bottom-3 right-3 left-3 top-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 3h5v5" />
                <path d="M20 3l-7.536 7.536a5 5 0 0 0 -1.464 3.534v6.93" />
                <path d="M4 5l4.5 4.5" />
              </svg>
            </div>

            <h1 className="font-bold text-2xl">MiniCRM</h1>
          </div>

          <h2 className="font-semibold text-2xl mt-2 text-gray-800">
            Register
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mt-4">
              <label className="pb-2 text-gray-700 text-m font-medium">
                Full Name
              </label>
              <input
                className="border border-[#edf2fa] bg-[#edf2fa] rounded-lg px-3 h-[40px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Full Name"
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="flex flex-col mt-4">
              <label className="pb-2 text-gray-700 text-m font-medium">
                Email Address
              </label>
              <input
                className="border border-[#edf2fa] bg-[#edf2fa] rounded-lg px-3 h-[40px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Email Address"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col mt-3">
              <label className="pb-2 text-gray-700 text-m font-medium">
                Password
              </label>
              <input
                className="border border-[#edf2fa] bg-[#edf2fa] rounded-lg px-3 h-[40px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex flex-col mt-3">
              <label className="pb-2 text-gray-700 text-m font-medium">
                Company
              </label>
              <input
                className="border border-[#edf2fa] bg-[#edf2fa] rounded-lg px-3 h-[40px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Company"
                {...register("company")}
              />
              {errors.company && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.company.message}
                </p>
              )}
            </div>

            <div className="flex flex-col mt-3">
              <label className="pb-2 text-gray-700 text-m font-medium">
                CustomerType
              </label>
              <select
                {...register("customerType")}
                className="border border-[#edf2fa] bg-[#edf2fa] rounded-lg px-3 h-[40px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="KOBI">KOBI</option>
                <option value="Bireysel">Bireysel</option>
                <option value="Kurumsal">Kurumsal</option>
              </select>
              {errors.customerType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.customerType.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2 justify-center mt-4">
              <div>
                <button
                  className="flex justify-center bg-[#00b852] hover:bg-green-600 transition-colors p-1 text-white mt-2 rounded-lg w-full h-[45px] items-center font-medium cursor-pointer"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Kayıt yapılıyor..." : "Register"}
                </button>
              </div>
            </div>
          </form>
          <div className="flex justify-center mt-3 ">
            <button
              type="button"
              className="flex justify-center cursor-pointer bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg w-full items-center font-medium cursor-pointer h-[45px]"
              onClick={() => router.push("/")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
