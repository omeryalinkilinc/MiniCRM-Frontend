"use client";
import { useRouter } from "next/navigation";
import { LockClosedIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fc] px-6 text-center">
      {/* İkon */}
      <div className="bg-red-100 p-4 rounded-full mb-6">
        <LockClosedIcon className="w-12 h-12 text-red-500" />
      </div>

      {/* Başlık */}
      <h1 className="text-4xl font-bold text-[#e84753] mb-4">
        403 - Yetkisiz Erişim
      </h1>

      {/* Açıklama */}
      <p className="text-gray-600 mb-6 max-w-md">
        Bu sayfaya erişim yetkiniz bulunmamaktadır. Lütfen doğru kullanıcı
        rolüyle giriş yaptığınızdan emin olun.
      </p>

      {/* Giriş Sayfasına Dön Butonu */}
      <button
        onClick={() => router.push("/login")}
        className="inline-flex items-center gap-2 px-6 py-2 bg-[#4c8ae3] text-white rounded hover:bg-[#3a6fc2] transition"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Giriş Sayfasına Dön
      </button>

      {/* Destek Linki */}
      <p className="text-sm text-gray-500 mt-4">
        Yardıma mı ihtiyacınız var?{" "}
        <a href="/support" className="text-blue-500 underline">
          Destek sayfasına gidin
        </a>
      </p>
    </div>
  );
}
