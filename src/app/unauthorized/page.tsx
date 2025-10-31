"use client";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#f8f9fc] px-6 text-center">
      <div className="max-w-md">
        <h1 className="text-4xl font-bold text-[#e84753] mb-4">
          403 - Yetkisiz Erişim
        </h1>
        <p className="text-gray-600 mb-6">
          Bu sayfaya erişim yetkiniz bulunmamaktadır. Lütfen doğru kullanıcı
          rolüyle giriş yaptığınızdan emin olun.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="bg-[#4c8ae3] text-white px-6 py-2 rounded hover:bg-[#3a6fc2] transition"
        >
          Giriş Sayfasına Dön
        </button>
      </div>
    </div>
  );
}
