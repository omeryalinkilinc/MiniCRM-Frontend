"use client";
import React, { useEffect, useState } from "react";
import Layout from "@/app/components/Layout";
import {
  UserIcon,
  LockClosedIcon,
  BellIcon,
  CogIcon,
} from "@heroicons/react/24/solid";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import SettingsTabs from "./components/SettingsTabs";
import SettingsContent from "./components/SettingsContent";
import { useAuth } from "@/app/hooks/useAuth";
import ProtectedRoute from "@/app/components/ProtectedRoute";

const Page = () => {
  const [activeTab, setActiveTab] = useState("profil");

  const { role, loading } = useAuth();
  if (loading || !role) return null;
  return (
    <Layout role={role}>
      <ProtectedRoute allowed={["customer"]}>
        <div className="p-6">
          <div>
            <span className="text-lg font-medium  text-[#657182]">
              Hesabınızı ve terchilerinizi güncelleyin
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <div className="col-span-1 md:col-span-2 p-4 ">
              <div>
                <SettingsTabs activeTab={activeTab} onChange={setActiveTab} />
              </div>

              <div className="bg-[#fff] rounded-xl">
                <SettingsContent activeTab={activeTab} />{" "}
              </div>
            </div>
            <div className="p-4">
              <div className="bg-[#fff] p-3 rounded-lg self-start">
                <div className="col-span-1 flex flex-col gap-4">
                  <div className="flex flex-col">
                    <div className="flex gap-2 items-center mb-4">
                      <ChatBubbleOvalLeftIcon className="w-8 h-8 " />
                      <span className="font-bold text-2xl">
                        Ayarlar Yardımı
                      </span>
                    </div>
                    <span className="text-sm font-medium  text-[#657182]">
                      Ayarlarınızla ilgili sorularınızı sorun
                    </span>
                  </div>
                  {/* İçerik buraya eklenebilir */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </Layout>
  );
};

export default Page;
