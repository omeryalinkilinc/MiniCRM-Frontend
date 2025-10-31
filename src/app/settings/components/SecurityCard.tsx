import React from "react";

export default function SecurityCard() {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <span className="font-bold text-2xl">Şifre Değiştir</span>
        <span className="text-sm font-medium  text-[#657182]">
          Hesap güvenliğiniz için düzenli olarak şifrenizi değiştirin
        </span>
      </div>

      <div className="mt-10 flex flex-col gap-4">
        <div>
          <div className="flex-1  flex flex-col gap-2">
            <label className="font-bold">Mevcut Şifre</label>
            <input
              type="password"
              className="border border-[#E1ECF5] h-10 rounded-lg pl-2 bg-[#F8FAFC]"
            />
          </div>
        </div>

        <div>
          <div className="flex-1  flex flex-col gap-2">
            <label className="font-bold">Yeni Şifre</label>
            <input
              type="password"
              className="border border-[#E1ECF5] h-10 rounded-lg pl-2 bg-[#F8FAFC]"
            />
          </div>
        </div>
        <div>
          <div className="flex-1  flex flex-col gap-2">
            <label className="font-bold">Yeni Şifre(Tekrar)</label>
            <input
              type="password"
              className="border border-[#E1ECF5] h-10 rounded-lg pl-2 bg-[#F8FAFC]"
            />
          </div>
        </div>

        <button className="flex-1 text-white bg-[#11B4D4] p-3 rounded-xl cursor-pointer">
          Şifreyi Güncelle
        </button>
      </div>
    </div>
  );
}
