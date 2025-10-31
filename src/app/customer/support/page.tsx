import React from "react";
import Layout from "@/app/components/Layout";
import {
  QuestionMarkCircleIcon,
  CheckCircleIcon,
  ChatBubbleLeftIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";
const page = () => {
  return (
    <Layout>
      <div className="p-6">
        <div className="flex flex-col">
          <span className="font-bold text-2xl">Destek Merkezi</span>
          <span className="text-lg font-medium  text-[#657182]">
            Size yardımcı olmak için buradayız
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col h-full bg-white p-6 rounded-xl">
            <div className="flex gap-4 items-center">
              <div className="bg-[#E7F7FA] p-3 rounded-lg">
                <QuestionMarkCircleIcon className="w-8 h-8 text-sky-500" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-lg">Ödeme Sorunları</span>
                <span className="text-sm font-medium text-[#657182]">
                  Ödeme işlemlerinizle ilgili yardım
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col h-full bg-white p-6 rounded-xl">
            <div className="flex gap-4 items-center">
              <div className="bg-[#E7F7FA] p-3 rounded-lg">
                <CheckCircleIcon className="w-8 h-8 text-sky-500" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-lg">Hesap Ayarları</span>
                <span className="text-sm font-medium text-[#657182]">
                  Hesabınızı yönetin
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col h-full bg-white p-6 rounded-xl">
            <div className="flex gap-4 items-center">
              <div className="bg-[#E7F7FA] p-3 rounded-lg">
                <ChatBubbleLeftIcon className="w-8 h-8 text-sky-500" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-lg">Teknik Destek</span>
                <span className="text-sm font-medium text-[#657182]">
                  Teknik sorunlarınız için destek
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Sol: Canlı Destek (2/3 genişlik) */}
          <div className="col-span-1 md:col-span-2 p-4 bg-white rounded-xl">
            <div className="flex gap-2 items-center mb-4">
              <ChatBubbleOvalLeftIcon className="w-8 h-8 text-sky-500" />
              <span className="font-bold text-2xl">Canlı Destek</span>
            </div>
            {/* İçerik buraya eklenebilir */}
          </div>

          {/* Sağ: Sık Sorulan Sorular (1/3 genişlik) */}
          <div className="col-span-1 flex flex-col gap-4 bg-[#fff] p-4 rounded-xl">
            <h1 className="font-bold text-2xl">Sık Sorulan Sorular</h1>

            <div className="bg-[#F1F5F9] p-4 rounded-lg flex flex-col gap-1">
              <span className="font-bold text-lg">
                Ödeme ne zaman hesabıma yansır?
              </span>
              <p className="text-sm text-[#657182]">
                Ödemeler genellikle 1-3 iş günü içinde hesabınıza yansır.
              </p>
            </div>

            <div className="bg-[#F1F5F9] p-4 rounded-lg flex flex-col gap-1">
              <span className="font-bold text-lg">
                Şifremi nasıl değiştirebilirim?
              </span>
              <p className="text-sm text-[#657182]">
                Ayarlar - Güvenlik bölümünden şifrenizi değiştirebilirsiniz.
              </p>
            </div>

            <div className="bg-[#F1F5F9] p-4 rounded-lg flex flex-col gap-1">
              <span className="font-bold text-lg">
                Destek ekibi çalışma saatleri nedir?
              </span>
              <p className="text-sm text-[#657182]">
                Destek ekibimiz hafta içi 09:00-18:00 saatleri arasında
                hizmetinizdedir
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default page;
