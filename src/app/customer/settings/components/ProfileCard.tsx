export default function ProfileCard() {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <span className="font-bold text-2xl">Kişisel Bilgiler</span>
        <span className="text-sm font-medium  text-[#657182]">
          Profil bilgilerinizi güncelleyin
        </span>
      </div>

      <div className="mt-10 flex flex-col gap-4">
        <div className="flex gap-x-4">
          <div className="flex-1  flex flex-col gap-2">
            <label className="font-bold">Ad</label>
            <input
              type="text"
              className="border border-[#E1ECF5] h-10 rounded-lg pl-2 bg-[#F8FAFC]"
            />
          </div>
          <div className="flex-1  flex flex-col gap-2">
            <label className="font-bold">Soyad</label>
            <input
              type="text"
              className="border border-[#E1ECF5] h-10 rounded-lg pl-2 bg-[#F8FAFC]"
            />
          </div>
        </div>
        <div>
          <div className="flex-1  flex flex-col gap-2">
            <label className="font-bold">Soyad</label>
            <input
              type="text"
              className="border border-[#E1ECF5] h-10 rounded-lg pl-2 bg-[#F8FAFC]"
            />
          </div>
        </div>

        <div>
          <div className="flex-1  flex flex-col gap-2">
            <label className="font-bold">Telefon</label>
            <input
              type="number"
              className="border border-[#E1ECF5] h-10 rounded-lg pl-2 bg-[#F8FAFC]"
            />
          </div>
        </div>

        <div>
          <div className="flex-1  flex flex-col gap-2">
            <label className="font-bold">Şirket Adı</label>
            <input
              type="text"
              className="border border-[#E1ECF5] h-10 rounded-lg pl-2 bg-[#F8FAFC]"
            />
          </div>
        </div>

        <div>
          <div className="flex-1  flex flex-col gap-2">
            <label className="font-bold">Hesap Tipi</label>
            <input
              type="text"
              className="border border-[#E1ECF5] h-10 rounded-lg pl-2 bg-[#F8FAFC]"
            />
          </div>
        </div>

        <button className="flex-1 text-white bg-[#11B4D4] p-3 rounded-xl cursor-pointer">
          Değişiklikleri Kaydet
        </button>
      </div>
    </div>
  );
}
