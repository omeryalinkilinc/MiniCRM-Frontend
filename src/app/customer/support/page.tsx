"use client";

import React from "react";
import Layout from "@/app/components/Layout";
import {
  QuestionMarkCircleIcon,
  CheckCircleIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";
import MessagePanel from "@/app/components/MessagePanel";
import { useUserInfo } from "../../hooks/useUserInfo";
import { useAuth } from "@/app/hooks/useAuth";
import ProtectedRoute from "@/app/components/ProtectedRoute";

const Page = () => {
  const user = useUserInfo();
  const { role: authRole, loading } = useAuth();

  // Kullanıcı bilgisi eksikse
  if (!user || user.id === null || user.role !== "Customer") {
    return <div className="p-6">Kullanıcı bilgisi alınamadı...</div>;
  }

  // Auth yükleniyorsa veya role yoksa
  if (loading || !authRole) return null;

  const { id: userId } = user;

  return (
    <Layout role={authRole}>
      <ProtectedRoute allowed={["customer"]}>
        <div className="p-6">
          <div className="flex flex-col">
            <span className="font-bold text-2xl">Destek Merkezi</span>
            <span className="text-lg font-medium text-[#657182]">
              Size yardımcı olmak için buradayız
            </span>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: (
                  <QuestionMarkCircleIcon className="w-8 h-8 text-sky-500" />
                ),
                title: "Ödeme Sorunları",
                desc: "Ödeme işlemlerinizle ilgili yardım",
              },
              {
                icon: <CheckCircleIcon className="w-8 h-8 text-sky-500" />,
                title: "Hesap Ayarları",
                desc: "Hesabınızı yönetin",
              },
              {
                icon: <ChatBubbleLeftIcon className="w-8 h-8 text-sky-500" />,
                title: "Teknik Destek",
                desc: "Teknik sorunlarınız için destek",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col h-full bg-white p-6 rounded-xl"
              >
                <div className="flex gap-4 items-center">
                  <div className="bg-[#E7F7FA] p-3 rounded-lg">{item.icon}</div>
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-lg">{item.title}</span>
                    <span className="text-sm font-medium text-[#657182]">
                      {item.desc}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Sol: Canlı Destek */}
            <div className="col-span-1 md:col-span-2 p-4 bg-white rounded-xl">
              <div className="flex gap-2 items-center mb-4">
                <div className="flex flex-col w-full">
                  <MessagePanel userId={userId} isAdmin={false} />
                </div>
              </div>
            </div>

            {/* Sağ: Sık Sorulan Sorular */}
            <div className="col-span-1 flex flex-col gap-4 bg-[#fff] p-4 rounded-xl">
              <h1 className="font-bold text-2xl">Sık Sorulan Sorular</h1>

              {[
                {
                  q: "Ödeme ne zaman hesabıma yansır?",
                  a: "Ödemeler genellikle 1-3 iş günü içinde hesabınıza yansır.",
                },
                {
                  q: "Şifremi nasıl değiştirebilirim?",
                  a: "Ayarlar - Güvenlik bölümünden şifrenizi değiştirebilirsiniz.",
                },
                {
                  q: "Destek ekibi çalışma saatleri nedir?",
                  a: "Hafta içi 09:00-18:00 saatleri arasında hizmetinizdedir.",
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="bg-[#F1F5F9] p-4 rounded-lg flex flex-col gap-1"
                >
                  <span className="font-bold text-lg">{faq.q}</span>
                  <p className="text-sm text-[#657182]">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </Layout>
  );
};

export default Page;
