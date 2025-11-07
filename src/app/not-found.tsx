"use client";

import Link from "next/link";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F8FAFC] text-center px-4">
      <FaceFrownIcon className="w-16 h-16 text-gray-400 mb-4" />
      <h1 className="text-3xl font-bold text-gray-700 mb-2">
        Sayfa bulunamadı
      </h1>
      <p className="text-gray-500 mb-6">
        Aradığınız sayfa mevcut değil veya URL yanlış.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}
