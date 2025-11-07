"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Uygulama hatası:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F8FAFC] text-center px-4">
      <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-3xl font-bold text-gray-700 mb-2">Bir hata oluştu</h1>
      <p className="text-gray-500 mb-6">
        Sunucu tarafında beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar
        deneyin.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Sayfayı Yenile
        </button>
        <Link
          href="/"
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}
