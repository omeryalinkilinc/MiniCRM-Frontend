"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";
import {
  UsersIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
  EllipsisHorizontalIcon,
  ArrowUpIcon,
  ChartBarIcon,
  ChartBarSquareIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/solid";
import {
  UserGroupIcon,
  CheckIcon,
  UserIcon,
  ArrowTrendingUpIcon,
  CreditCardIcon,
  UserPlusIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import Layout from "../components/Layout";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/dates/styles.css";
import { BarChart, PieChart, AreaChart } from "@mantine/charts";
import { MiniCalendar } from "@mantine/dates";
import {
  data,
  getCustomerCount,
  getCustomerSegments,
  Areadata,
  getTransactionCount,
  getTransactionVolume,
  getCustomerGrowth,
  getMonthlyTransactionVolume,
  fetchRecentTransactions,
} from "./data";
import { Group, Text, Box } from "@mantine/core";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../hooks/useAuth";

const pieDescription = [
  { name: "Bireysel", color: "#4c6ef5" },
  { name: "Kobi", color: "#fab005" },
  { name: "Kurumsal", color: "#12b886" },
];

// Transaction tipi
type Transaction = {
  id: number;
  transactionType: string;
  description: string;
  date: string;
  status: string;
  amount?: number;
  customer: {
    name: string;
    lastName: string;
    companyName: string;
    accountType: string;
  };
};

// Activity tipi
type Activity = {
  id: number;
  fullName: string;
  companyName: string;
  accountType: string;
  description: string;
  amount?: number;
  status: string;
  timeAgo: string;
};

// Zaman farkı hesaplayan fonksiyon
function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "şimdi";
  if (diffMin < 60) return `${diffMin} dk önce`;
  const diffHrs = Math.floor(diffMin / 60);
  if (diffHrs < 24) return `${diffHrs} saat önce`;
  const diffDays = Math.floor(diffHrs / 24);
  return `${diffDays} gün önce`;
}

const Page = () => {
  const router = useRouter();
  const gridRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState<string | null>(
    new Date().toISOString().split("T")[0]
  );
  const [pieData, setPieData] = useState<
    { name: string; value: number; color: string }[]
  >([]);
  const [customerCount, setCustomerCount] = useState<number | null>(null);

  useEffect(() => {
    getCustomerSegments().then(setPieData);
    getCustomerCount().then(setCustomerCount);
  }, []);

  const [transactionCount, setTransactionCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getTransactionCount();
      setTransactionCount(result);
    };
    fetchData();
  }, []);

  const [transactionVolume, setTransactionVolume] = useState([]);

  useEffect(() => {
    getTransactionVolume().then((data) => {
      console.log("İşlem hacmi verisi:", data); // ⬅️ Konsolda kontrol et
      setTransactionVolume(data);
    });
  }, []);

  const [mounthlyTransactionVolume, setMounthlyTransactionVolume] = useState(
    []
  );

  useEffect(() => {
    getMonthlyTransactionVolume().then((data) => {
      console.log("İşlem hacmi verisi:", data); // ⬅️ Konsolda kontrol et
      setMounthlyTransactionVolume(data);
    });
  }, []);

  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (gridRef.current) {
      GridStack.init(
        {
          column: 12,
          cellHeight: 100,
          float: true,
          resizable: { handles: "e, se, s, sw, w" },
          columnOpts: {
            breakpointForWindow: true,
            breakpoints: [
              { w: 480, c: 1 }, // Mobil
              { w: 600, c: 2 }, // Küçük mobil
              { w: 800, c: 3 }, // Tablet
              { w: 1024, c: 6 }, // Laptop
              { w: 1280, c: 12 }, // Desktop
            ],
          },
        },
        gridRef.current
      );
    }
  }, [isAuthorized]);

  const [customerGrowth, setCustomerGrowth] = useState<number | null>(null);

  useEffect(() => {
    getCustomerGrowth().then(setCustomerGrowth);
  });

  const [activities, setActivities] = useState<Activity[]>([]);
  useEffect(() => {
    fetchRecentTransactions().then((data: Transaction[]) => {
      const now = new Date();

      const filtered = data.filter((tx: Transaction) => {
        const txDate = new Date(tx.date);
        const diffMs = now.getTime() - txDate.getTime();
        const diffHrs = diffMs / (1000 * 60 * 60);
        return diffHrs <= 168; // 7 gün = 168 saat
      });

      const formatted = filtered.map((tx: Transaction) => ({
        id: tx.id,
        fullName: tx.customer?.name || "Bilinmeyen",
        companyName: tx.customer.companyName,
        accountType: tx.customer.accountType,
        description: tx.transactionType,
        amount: tx.amount,
        status: tx.status.toUpperCase(),
        timeAgo: formatTimeAgo(tx.date),
      }));

      setActivities(formatted);
    });
  }, []);

  const { role, loading } = useAuth();
  if (loading || !role) return null;

  return (
    <Layout role={role}>
      <ProtectedRoute
        allowed={["admin"]}
        onAuthorized={() => setIsAuthorized(true)}
      >
        <div className="grid-stack px-2 overflow-x-hidden" ref={gridRef}>
          <div
            className="grid-stack-item"
            gs-id="calendar"
            gs-x="12"
            gs-y="0"
            gs-w="2"
            gs-h="1"
          >
            <div className="grid-stack-item-content flex justify-center self-start">
              <MiniCalendar
                value={value}
                onChange={setValue}
                numberOfDays={6}
                w="100%"
                className="justify-end"
              />
            </div>
          </div>

          <div
            className="grid-stack-item border-3 border-[#f3f5f8] rounded-xl bg-[#fff]"
            gs-id="toplam-musteri-card"
            gs-x="0"
            gs-y="1"
            gs-w="3"
            gs-h="2"
          >
            <div className="grid-stack-item-content">
              <div className="flex items-center justify-between h-full p-5">
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-medium  text-[#657182]">
                    Toplam Müşteri
                  </span>
                  <span className="font-sans font-bold text-2xl">
                    {" "}
                    {customerCount !== null ? customerCount : "Yükleniyor..."}
                  </span>
                  <div className="flex justify-between gap-4  items-center">
                    <div className="flex items-center gap-2">
                      {customerGrowth !== null && customerGrowth > 0 ? (
                        <ArrowUpIcon className="w-8 h-8 text-[#8ad8ae]" />
                      ) : (
                        <ArrowDownIcon className="w-8 h-8 text-[#f87171]" />
                      )}
                      <span
                        className={`font-bold text-3xl min-w-[80px] ${
                          customerGrowth !== null
                            ? customerGrowth > 0
                              ? "text-[#8ad8ae]"
                              : "text-[#f87171]"
                            : ""
                        }`}
                      >
                        {customerGrowth !== null
                          ? `${customerGrowth.toFixed(0)}%`
                          : "Yükleniyor..."}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="">
                  <UserGroupIcon className="w-8 h-8" />
                </div>
              </div>
            </div>
          </div>

          <div
            className="grid-stack-item border-3 border-[#f3f5f8] rounded-xl bg-[#fff]"
            gs-id="toplam-musteri-card"
            gs-x="3"
            gs-y="1"
            gs-w="3"
            gs-h="2"
          >
            <div className="grid-stack-item-content">
              <div className="flex items-center justify-between h-full p-5">
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-medium  text-[#657182]">
                    Toplam İşlem Sayısı
                  </span>
                  <span className="font-bold text-3xl">
                    {transactionCount !== null
                      ? transactionCount
                      : "Yükleniyor..."}
                  </span>
                  <div className="flex justify-between gap-4  items-center"></div>
                </div>
                <div className="">
                  <CreditCardIcon className="w-8 h-8" />
                </div>
              </div>
            </div>
          </div>

          <div
            className="grid-stack-item border-3 border-[#f3f5f8] rounded-xl bg-[#fff]"
            gs-id="aktif-kullanici-card"
            gs-x="6"
            gs-y="1"
            gs-w="3"
            gs-h="2"
          >
            <div className="grid-stack-item-content  ">
              <div className="flex items-center justify-between h-full p-5">
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-medium  text-[#657182]">
                    Aktif Kullanıcı Sayısı
                  </span>
                  <span className="font-bold text-3xl">
                    {customerCount !== null ? customerCount : "Yükleniyor..."}{" "}
                  </span>
                  <div className="flex justify-between gap-4  items-center"></div>
                </div>
                <div className="">
                  <UserIcon className="w-6 h-6 text-gray-500" />
                </div>
              </div>
            </div>
          </div>

          <div
            className="grid-stack-item border-3 border-[#f3f5f8] rounded-xl bg-[#fff]"
            gs-id="aktif-kullanici-card"
            gs-x="9"
            gs-y="1"
            gs-w="3"
            gs-h="2"
          >
            <div className="grid-stack-item-content  ">
              <div className="flex items-center justify-between h-full p-5">
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-medium  text-[#657182]">
                    Gelir Artışı
                  </span>
                  <span className="font-bold text-3xl">---</span>
                  <div className="flex justify-between gap-4  items-center"></div>
                </div>
                <div className="">
                  <ArrowTrendingUpIcon className="w-6 h-6 text-gray-500" />
                </div>
              </div>
            </div>
          </div>

          <div
            className="grid-stack-item border-3 border-[#f3f5f8] rounded-xl bg-[#fff]"
            gs-id="hizli-islem"
            gs-x="0"
            gs-y="3"
            gs-w="5"
            gs-h="5"
          >
            <div className="grid-stack-item-content">
              <div className="p-4">
                <h1 className="font-sans font-bold text-2xl mt-1 mb-1 p-2 ">
                  Hızlı Aksiyonlar
                </h1>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center bg-[#F8FAFC] p-2 py-3 rounded-xl cursor-pointer hover:bg-[#11B4D4] hover:text-white">
                    <UserPlusIcon className="w-8 h-8" />
                    <span className="mt-1">Add Customer</span>
                  </div>
                  <div className="flex flex-col items-center bg-[#F8FAFC] p-2 py-3 rounded-xl cursor-pointer hover:bg-[#11B4D4] hover:text-white">
                    <DocumentTextIcon className="w-8 h-8" />
                    <span className="mt-1">Generate Report</span>
                  </div>
                  <div className="flex flex-col items-center bg-[#F8FAFC] p-2 py-3 rounded-xl cursor-pointer hover:bg-[#11B4D4] hover:text-white">
                    <EnvelopeIcon className="w-8 h-8" />
                    <span>Send Campaign</span>
                  </div>
                  <div className="flex flex-col items-center bg-[#F8FAFC] p-2 py-3 rounded-xl cursor-pointer hover:bg-[#11B4D4] hover:text-white">
                    <CurrencyDollarIcon className="w-8 h-8" />
                    <span>New Transaction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="grid-stack-item border-3 border-[#f3f5f8]  rounded-xl bg-[#fff]"
            gs-id="son-etkinlik-card"
            gs-x="8"
            gs-y="3"
            gs-w="7"
            gs-h="5"
          >
            <div className="grid-stack-item-content">
              <div className="grid-stack-item-content p-4">
                <h3 className="font-bold text-xl mb-4">Son Etkinlikler</h3>
                <ul className="space-y-4">
                  {activities.map((activity) => (
                    <li
                      key={activity.id}
                      className="flex justify-between items-center"
                    >
                      <div className="flex gap-3 items-center">
                        <div className="bg-blue-100 text-blue-800 font-bold rounded-full w-10 h-10 flex items-center justify-center">
                          {activity.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold">
                            {activity.fullName}
                          </div>
                          <div className="text-sm text-gray-600">
                            {activity.description}
                          </div>
                          {activity.amount && (
                            <div className="text-sm font-bold text-gray-800">
                              ₺{activity.amount.toLocaleString("tr-TR")}
                            </div>
                          )}
                          <div className="text-xs text-gray-400">
                            {activity.timeAgo}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`p-2 rounded text-sm font-medium  rounded-xl ${
                          activity.status === "TAMAMLANDI"
                            ? "bg-green-100 text-green-700"
                            : activity.status === "BEKLEMEDE"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {activity.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div
            className="grid-stack-item border-3 border-[#f3f5f8]  rounded-xl"
            gs-id="müsteri-segment-card"
            gs-x="9"
            gs-y="8"
            gs-w="6"
            gs-h="6"
          >
            <div className="grid-stack-item-content">
              <div className="bg-white  shadow w-full  h-full">
                <h2 className="font-sans font-bold text-2xl  p-4 ">
                  Müşteri Segmentleri
                </h2>
                <Box>
                  <PieChart
                    h={400}
                    w="100%"
                    data={pieData}
                    withTooltip
                    withLabels
                  />

                  {/* Legend */}
                  <Group justify="center">
                    {pieDescription.map((item) => (
                      <Group key={item.name}>
                        <Box
                          w={12}
                          h={12}
                          bg={item.color}
                          style={{ borderRadius: 2 }}
                        />
                        <Text>{item.name}</Text>
                      </Group>
                    ))}
                  </Group>
                </Box>
              </div>
            </div>
          </div>

          <div
            className="grid-stack-item border-[#f3f5f8] rounded-xl"
            gs-id="islem-hacim-card"
            gs-x="0"
            gs-y="5"
            gs-w="6"
            gs-h="6"
          >
            <div className="grid-stack-item-content">
              <div className="bg-white p-4 rounded shadow w-full">
                <h2 className="font-sans font-bold text-2xl  p-4 ">
                  İşlem Hacmi
                </h2>
                <BarChart
                  w="100%"
                  h={550}
                  data={mounthlyTransactionVolume}
                  dataKey="month"
                  series={[{ name: "count", color: "violet.6" }]}
                  tickLine="y"
                  withLegend
                  minBarSize={20}
                  maxBarWidth={50}
                />
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </Layout>
  );
};

export default Page;
