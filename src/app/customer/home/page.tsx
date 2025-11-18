"use client";
import Layout from "@/app/components/Layout";
import React, { useEffect, useRef, useState } from "react";
import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";
import { Avatar } from "@mantine/core";
import {
  ChartBarIcon,
  ArrowPathIcon,
  CalendarDaysIcon,
  ChatBubbleBottomCenterTextIcon,
  MegaphoneIcon,
  PlusIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  WalletIcon,
  ArrowTrendingUpIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  CreditCardIcon,
  BellIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import "@mantine/core/styles.css";
import { Modal, Button, Table } from "@mantine/core"; // Mantine bileşenleri
import { Skeleton } from "@mantine/core";
import { getInitials } from "@/app/utils/string";
import { getCurrencyRates } from "./data";
import { RingProgress, Text } from "@mantine/core";
import { Target } from "lucide-react";
import { getCustomerInfo } from "@/lib/api/customer";
import { fetchTransactions } from "@/lib/api/transactions";
import { LineChart } from "@mantine/charts";
import { Linedata } from "./data";
import { useAuth } from "@/app/hooks/useAuth";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { getCurrentUser } from "@/lib/api/auth";
type Transaction = {
  id?: number;
  transactionType: string;
  description: string;
  date: string;
  status: string;
  amount?: number;
  customerId: number;
};

const page = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (gridRef.current) {
      const grid = GridStack.init(
        {
          column: 12,
          columnOpts: {
            breakpointForWindow: true,
            breakpoints: [{ w: 700, c: 1, layout: "list" as any }],
          },
          cellHeight: 100,
          disableResize: false,
          float: true,
          resizable: { handles: "e, se, s, sw, w" },
        },
        gridRef.current
      );
    }
  }, [isAuthorized]);

  const progress = 60;

  const [user, setUser] = useState<{ fullName: string; email: string } | null>(
    null
  );

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch((err) => console.error(err));
  }, []);

  type CurrencyRates = {
    USD: number;
    EUR: number;
    GBP: number;
    date: string;
  };

  const [rates, setRates] = useState<CurrencyRates | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      const data = await getCurrencyRates();
      setRates(data);
    };
    fetchRates();
  }, []);

  const [customerId, setCustomerId] = useState<number | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>(
    []
  );

  useEffect(() => {
    getCustomerInfo().then((info) => {
      if (info?.id) setCustomerId(info.id);
    });
  }, []);

  useEffect(() => {
    if (!customerId) return;

    const loadRecentTransactions = async () => {
      const data = await fetchTransactions(customerId);
      const sorted = data
        .sort(
          (a: Transaction, b: Transaction) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        .slice(0, 4);
      setRecentTransactions(sorted);
    };

    loadRecentTransactions();
  }, [customerId]);

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Beklemede":
        return "bg-[#F59F0A] text-white";
      case "Tamamlandı":
        return "bg-[#21C45D] text-white";
      case "İptal Edildi":
        return "bg-[#EF4343] text-white";
      default:
        return "";
    }
  };

  const { role, loading } = useAuth();
  if (loading || !role) return null;

  return (
    <Layout role={role}>
      <ProtectedRoute
        allowed={["customer"]}
        onAuthorized={() => setIsAuthorized(true)}
      >
        <div className="grid-stack font-sans ml-5 mr-5 mt-4" ref={gridRef}>
          <div
            className="grid-stack-item bg-[#fff] rounded-xl "
            gs-x="0"
            gs-y="0"
            gs-w="12"
            gs-h="3"
          >
            <div className="grid-stack-item-content flex flex-col justify-center">
              {user === null ? (
                <div className="flex gap-4 items-center">
                  <Skeleton circle height={70} width={70} />
                  <div className="flex flex-col gap-2">
                    <Skeleton height={20} width={200} />
                    <Skeleton height={16} width={150} />
                  </div>
                  <div className="mt-5 w-full">
                    <Skeleton height={20} width="60%" />
                    <Skeleton
                      height={12}
                      width="100%"
                      radius="xl"
                      className="my-2"
                    />
                    <Skeleton height={16} width="40%" />
                    <Skeleton height={32} width={120} radius="md" />
                  </div>
                </div>
              ) : (
                <div className="flex justify-between">
                  <div className="flex gap-4 flex-col w-[70%]">
                    <div className="flex items-center gap-2">
                      <Avatar color="cyan" radius="xl" size={70}>
                        {getInitials(user.fullName)}
                      </Avatar>

                      <div className="flex flex-col">
                        <span className="font-sans font-bold text-xl">
                          Hoş Geldin, {user.fullName}
                        </span>
                        <span>Son giriş. 5 Eylül 2024</span>
                      </div>
                    </div>

                    <div className="mt-5 ">
                      <h3>Profil Tamamlandı</h3>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-3 max-w-[40%] flex">
                        <div
                          className="bg-[#11B4D4] h-3 rounded-full transition-all duration-500 "
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mb-4">
                          Eksik bilgilerini tamamla, daha iyi deneyim yaşa.
                        </span>
                      </div>
                      <button className="bg-[#56c9a4] text-white px-4 py-1.5 rounded-lg hover:bg-green-600 transition cursor-pointer">
                        Tamamla
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span className="text-sm text-gray-600">
                      <RingProgress
                        size={200}
                        thickness={10}
                        sections={[{ value: progress, color: "#11B4D4" }]}
                        label={
                          <Text size="xl" fw={700} ta="center">
                            {progress}%
                          </Text>
                        }
                      />
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            className="grid-stack-item border border-[#f8f8fb] rounded-xl bg-[#fff] m-2"
            gs-x="0"
            gs-y="3"
            gs-w="3"
            gs-h="2"
          >
            <div className="grid-stack-item-content">
              <div className="flex items-center justify-between h-full p-5">
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-medium  text-[#657182]">
                    Toplam Harcama
                  </span>
                  <span className="font-sans font-bold text-2xl">₺12,450</span>
                  <span className="font-sans font-bold text-[#24BF64] ">
                    +12.5% from last month
                  </span>
                </div>
                <div className="bg-[#E7F7FA] p-3 rounded-lg">
                  <WalletIcon className="w-8 h-8 text-sky-500" />
                </div>
              </div>
            </div>
          </div>

          <div
            className="grid-stack-item border border-[#f8f8fb] rounded-xl bg-[#fff] m-2"
            gs-x="3"
            gs-y="3"
            gs-w="3"
            gs-h="2"
          >
            <div className="grid-stack-item-content">
              <div className="flex items-center justify-between h-full p-5">
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-medium  text-[#657182]">
                    Toplam İade
                  </span>
                  <span className="font-sans font-bold text-2xl">₺12,450</span>
                  <span className="font-sans font-bold text-[#24BF64] ">
                    +3.5% from last month
                  </span>
                </div>
                <div className="bg-[#E7F7FA] p-3 rounded-lg">
                  <ArrowPathIcon className="w-8 h-8 text-sky-500  " />
                </div>
              </div>
            </div>
          </div>

          <div
            className="grid-stack-item border border-[#f8f8fb] rounded-xl bg-[#fff] m-2"
            gs-x="6"
            gs-y="3"
            gs-w="3"
            gs-h="2"
          >
            <div className="grid-stack-item-content">
              <div className="flex items-center justify-between h-full p-5">
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-medium  text-[#657182]">
                    Son İşlem Tarihi
                  </span>
                  <span className="font-sans font-bold text-2xl">
                    2 Gün Önce
                  </span>
                </div>
                <div className="bg-[#E7F7FA] p-3 rounded-lg">
                  <CalendarDaysIcon className="w-8 h-8 text-sky-500   " />
                </div>
              </div>
            </div>
          </div>

          <div
            className="grid-stack-item border border-[#f8f8fb] rounded-xl bg-[#fff] m-2"
            gs-x="9"
            gs-y="3"
            gs-w="3"
            gs-h="2"
          >
            <div className="grid-stack-item-content ">
              <div className="flex items-center justify-between h-full p-5">
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-medium  text-[#657182]">
                    Aktif Kampanya Sayısı
                  </span>
                  <span className="font-sans font-bold text-2xl">2 </span>
                </div>
                <div className="bg-[#E7F7FA] p-3 rounded-lg">
                  <Target className="w-8 h-8 text-sky-500   " />
                </div>
              </div>
            </div>
          </div>

          <div
            className="grid-stack-item border-[#f8f8fb] rounded-xl bg-[#fff] m-2 mt-3"
            gs-x="0"
            gs-y="5"
            gs-w="7"
            gs-h="5"
          >
            <div className="grid-stack-item-content pt-2">
              <div className="p-2 flex justify-between items-center">
                <h1 className="font-sans font-bold text-2xl mt-1 mb-1 p-2 ">
                  Harcamaya Genel Bakış
                </h1>
                <span className="text-lg font-medium  text-[#657182]">
                  Son 6 aydaki harcamalarınız ve iadeleriniz
                </span>
              </div>
              <div className="">
                <LineChart
                  h={400}
                  data={Linedata}
                  dataKey="date"
                  series={[
                    { name: "Apples", color: "indigo.6" },
                    { name: "Oranges", color: "blue.6" },
                  ]}
                  curveType="linear"
                />
              </div>
            </div>
          </div>

          <div
            className="grid-stack-item border-[#f8f8fb] rounded-xl bg-[#fff] m-2 mt-3"
            gs-x="9"
            gs-y="5"
            gs-w="4"
            gs-h="5"
          >
            <div className="grid-stack-item-content">
              <div className="p-4">
                <h1 className="font-sans font-bold text-2xl mt-1 mb-1 p-2 ">
                  Hızlı Aksiyonlar
                </h1>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center bg-[#F8FAFC] p-2 py-3 rounded-xl cursor-pointer hover:bg-[#11B4D4] hover:text-white">
                    <DocumentTextIcon className="w-8 h-8" />
                    <span className="mt-1">New Transaction</span>
                  </div>
                  <div className="flex flex-col items-center bg-[#F8FAFC] p-2 py-3 rounded-xl cursor-pointer hover:bg-[#11B4D4] hover:text-white">
                    <ArrowDownTrayIcon className="w-8 h-8" />
                    <span className="mt-1">Export Report</span>
                  </div>
                  <div className="flex flex-col items-center bg-[#F8FAFC] p-2 py-3 rounded-xl cursor-pointer hover:bg-[#11B4D4] hover:text-white">
                    <ChatBubbleLeftRightIcon className="w-8 h-8" />
                    <span>Contact Support</span>
                  </div>
                  <div className="flex flex-col items-center bg-[#F8FAFC] p-2 py-3 rounded-xl cursor-pointer hover:bg-[#11B4D4] hover:text-white">
                    <CreditCardIcon className="w-8 h-8" />
                    <span>Payment Methods</span>
                  </div>
                  <div className="flex flex-col items-center bg-[#F8FAFC] p-2 py-3 rounded-xl cursor-pointer hover:bg-[#11B4D4] hover:text-white">
                    <BellIcon className="w-8 h-8" />
                    <span>Notifications</span>
                  </div>
                  <div className="flex flex-col items-center bg-[#F8FAFC] p-2 py-3 rounded-xl cursor-pointer hover:bg-[#11B4D4] hover:text-white">
                    <Cog6ToothIcon className="w-8 h-8" />
                    <span>Account Settings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="grid-stack-item bg-[#fff] rounded-xl  m-2 mt-5 mb-5"
            gs-x="0"
            gs-y="10"
            gs-w="7"
            gs-h="6"
          >
            <div className="grid-stack-item-content p-3">
              <h3 className="font-sans font-bold text-2xl mt-1 mb-1 p-2 ">
                Son İşlem Geçmişi
              </h3>

              <div>
                <ul className="space-y-2">
                  {recentTransactions.map((tx) => (
                    <li key={tx.id}>
                      <div className="bg-[#FAFBFD] p-3 rounded-lg flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground text-xl">
                            {tx.transactionType}
                          </span>
                          <span className="text-[#657182]">
                            {new Date(tx.date).toLocaleDateString("tr-TR")}
                          </span>
                        </div>
                        <div className="flex gap-4 items-center">
                          {typeof tx.amount === "number" && (
                            <span className="font-sans font-bold text-lg">
                              {tx.amount.toLocaleString("tr-TR")} ₺
                            </span>
                          )}
                          <span
                            className={`text-sm px-2 py-1 rounded-full border font-bold ${getStatusClass(
                              tx.status
                            )}`}
                          >
                            {tx.status}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                  {recentTransactions.length === 0 && (
                    <li className="text-gray-500 text-sm p-2">
                      Henüz işlem yok.
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div
            className="grid-stack-item border border-[#f8f8fb] bg-[#fff] rounded-xl m-2 mt-5 mb-5"
            gs-id="doviz-card"
            gs-x="11"
            gs-y="10"
            gs-w="4"
            gs-h="4"
          >
            <div className="grid-stack-item-content p-3">
              <h3 className="font-sans font-bold text-2xl mt-1 mb-1 p-2 ">
                Anlık Döviz Bilgileri
              </h3>

              <div className="flex flex-col gap-4 ">
                <div className="flex items-center justify-between bg-[#FAFBFD] p-3 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#31B36A1A] rounded-full p-1">
                      <ArrowTrendingUpIcon className="w-7 h-7 text-[#24BF64]" />
                    </div>
                    <div>
                      <span className="font-sans text-xl">USD/TRY</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-sans font-bold text-xl">
                      {rates?.USD.toFixed(2)}₺
                    </span>
                    <span className="text-[#24BF64]">+0.15%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-[#FAFBFD] p-3 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#31B36A1A] rounded-full p-1">
                      <ArrowTrendingUpIcon className="w-7 h-7 text-[#24BF64]" />
                    </div>
                    <div>
                      <span className="font-sans text-xl">EUR/TRY</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-sans font-bold text-xl">
                      {rates?.EUR.toFixed(2)}₺
                    </span>
                    <span className="text-[#24BF64]">+0.15%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-[#FAFBFD] p-3 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#31B36A1A] rounded-full p-1">
                      <ArrowTrendingUpIcon className="w-7 h-7 text-[#24BF64]" />
                    </div>
                    <div>
                      <span className="font-sans text-xl">GBP/TRY</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-sans font-bold text-xl">
                      {rates?.GBP.toFixed(2)}₺
                    </span>
                    <span className="text-[#24BF64]">+0.15%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </Layout>
  );
};

export default page;
