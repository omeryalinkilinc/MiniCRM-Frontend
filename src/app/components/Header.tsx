"use client";
import { useRouter } from "next/navigation";

import React from "react";

const Header = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch("http://localhost:5270/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) {
      console.log("Çıkış başarılı");
      router.replace("/login");
    } else {
      console.error("Çıkış başarısız");
    }
  };

  return (
    <div className="h-[80px] pr-4 pl-4 flex items-center bg-[#fafcfe] flex-1">
      <div className="w-full flex justify-between items-center">
        <div>
          <h1 className="font-bold text-3xl">Dashboard </h1>
        </div>

        <div>
          <ul className="flex gap-4">
            <li>Hoş Geldin,Ömer</li>
            <li>Exper</li>
            <li>
              <button
                className="bg-red-600 p-1 py-2 rounded cursor-pointer"
                onClick={handleLogout}
              >
                Çıkış
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
