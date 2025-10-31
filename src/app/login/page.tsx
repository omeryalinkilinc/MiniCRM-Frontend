"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const LoginPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const schema = yup.object({
    email: yup
      .string()
      .email("Geçerli bir e-posta girin")
      .required("E-posta zorunlu"),
    password: yup
      .string()
      .min(6, "Şifre en az 6 karakter olmalı")
      .required("Şifre zorunlu"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5270/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        const role = result.role?.toLowerCase();
        if (role === "admin") router.push("/dashboard");
        else if (role === "customer") router.push("/customer/home");
        else console.warn("Bilinmeyen rol:", role);
      } else {
        alert("Giriş başarısız: " + result.message);
      }
    } catch (error) {
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center h-screen items-center bg-[#f2f5fd] font-sans">
      <div>
        <div className="border border-[#fff] p-5 rounded-2xl mt-6 w-[400px] bg-[#fff] shadow-card">
          <div className="flex justify-center items-center">
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
            <h1 className="font-bold text-2xl text-gray-800">MiniCRM</h1>
          </div>

          <h2 className="font-semibold text-2xl mt-2 text-gray-800">Log in</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mt-4">
              <label className="pb-2 text-gray-700 text-m font-medium">
                Email Address
              </label>
              <input
                className="border border-[#edf2fa] bg-[#edf2fa] rounded-lg px-3 h-[40px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email Address"
                type="text"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col mt-4">
              <label className="pb-2 text-gray-700 text-m font-medium">
                Password
              </label>
              <input
                className="border border-[#edf2fa] bg-[#edf2fa] rounded-lg px-3 h-[40px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-center mt-3">
              <button
                type="submit"
                disabled={loading}
                className={`flex justify-center transition-colors p-1 text-white mt-2 rounded-lg w-full h-[45px] items-center font-medium cursor-pointer ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#0769ff] hover:bg-blue-700"
                }`}
              >
                {loading && <span className="loader mr-2" />}

                {loading ? "Giriş yapılıyor..." : "Login"}
              </button>
            </div>
          </form>

          <div className="flex justify-center mt-2">
            <button
              className="flex justify-center bg-[#00b852] hover:bg-green-600 transition-colors p-1 text-white mt-2 rounded-lg w-full h-[45px] items-center font-medium cursor-pointer"
              onClick={() => router.push("/register")}
            >
              Register
            </button>
          </div>

          <div className="flex justify-center mt-3">
            <a
              href="#"
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
