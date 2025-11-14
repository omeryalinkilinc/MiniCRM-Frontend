"use client";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";
import { Select } from "@mantine/core";
import { useAuth } from "../hooks/useAuth";
import ProtectedRoute from "../components/ProtectedRoute";
import { DatePickerInput } from "@mantine/dates";
import {
  CreditCardIcon,
  UserGroupIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

import { getTransactionCount } from "@/lib/api/totalTransaction";
import ReportsTabs from "./components/ReportsTabs";
import ReportsContent from "./components/ReportsContent";
import { getNewCustomers } from "@/lib/api/customer";
import { data } from "./data";
const page = () => {
  const { role, loading } = useAuth();
  const [value, setValue] = useState<string | null>(null);
  const [transactionCount, setTransactionCount] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("musteri buyumesi");

  useEffect(() => {
    const fetchData = async () => {
      const result = await getTransactionCount();
      setTransactionCount(result);
    };
    fetchData();
  }, []);

  const [weeklyCount, setWeeklyCount] = useState<number>(0);
  const [monthlyCount, setMonthlyCount] = useState<number>(0);

  useEffect(() => {
    getNewCustomers().then((data) => {
      setWeeklyCount(data.weeklyCount);
      setMonthlyCount(data.monthlyCount);
    });
  }, []);

  if (loading || !role) return null;
  return (
    <Layout role={role}>
      <ProtectedRoute allowed={["admin"]}>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium  text-[#657182]">
              İş raporları oluşturun ve analiz edin
            </span>
            <button className="bg-[#066FF9] p-3 rounded-lg text-white flex cursor-pointer">
              Export Reports
            </button>
          </div>

          <div className="flex items-center gap-4 justify-between mt-5">
            <div className="flex flex-col gap-1 flex-1 ">
              <label>Report Type</label>
              <Select
                className="py-2"
                data={[
                  "All Reports",
                  "Revenue Report",
                  "Customer Report",
                  "Transaction Report",
                ]}
                defaultValue="All Reports"
              />
            </div>

            <div className="flex flex-col gap-1 flex-1 ">
              <label>From Date</label>
              <DatePickerInput
                value={value}
                onChange={setValue}
                placeholder="Pick date"
                className=""
              />
            </div>

            <div className="flex flex-col gap-1 flex-1 ">
              <label>To Date</label>
              <DatePickerInput
                value={value}
                onChange={setValue}
                placeholder="Pick date"
              />
            </div>

            <div className="flex flex-col justify-end min-h-[80px]">
              <button className="bg-[#066FF9] px-5 py-3 rounded-lg text-white cursor-pointer">
                Generate Report
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2  justify-around mt-5">
            <div className="flex-1 min-w-[150px] max-w-[430px] border-3 border-[#f3f5f8] rounded-xl bg-[#fff]">
              <div className="grid-stack-item-content">
                <div className=" h-full p-5">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium  text-[#657182]">
                        Toplam İşlem Sayısı
                      </span>

                      <div className="">
                        <CreditCardIcon className="w-8 h-8" />
                      </div>
                    </div>
                    <span className="font-bold text-3xl">
                      {transactionCount !== null
                        ? transactionCount
                        : "Yükleniyor..."}
                    </span>
                    <div className="flex justify-between gap-4  items-center"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" flex-1 min-w-[150px] max-w-[430px] border-3 border-[#f3f5f8] rounded-xl bg-[#fff]">
              <div className="grid-stack-item-content">
                <div className=" h-full p-5">
                  <div className="flex flex-col gap-2">
                    <div className=" flex justify-between items-center">
                      <span className="text-lg font-medium  text-[#657182]">
                        Yeni Müşteriler
                      </span>
                      <div className="">
                        <UserGroupIcon className="w-8 h-8" />
                      </div>
                    </div>

                    <div>
                      <div className="flex gap-2 items-center mb-2">
                        <span className="font-bold text-3xl">
                          {weeklyCount}
                        </span>
                        <span className="text-[#657182]  text-sm">
                          Son 7 Gün
                        </span>
                      </div>
                      <div className="pt-3 border-t border-[#e0e5eb] w-full flex gap-2 items-center">
                        <span className="font-bold text-3xl">
                          {monthlyCount}
                        </span>
                        <span className="text-[#657182]  text-sm">Bu Ay</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-[150px] max-w-[430px] border-3 border-[#f3f5f8] rounded-xl bg-[#fff]">
              <div className="grid-stack-item-content">
                <div className=" h-full p-5">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium  text-[#657182]">
                        Oluşturulan Raporlar
                      </span>
                      <div className="">
                        <DocumentTextIcon className="w-8 h-8" />
                      </div>
                    </div>
                    <div className="flex justify-between gap-4  items-center"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="w-fit">
              <ReportsTabs activeTab={activeTab} onChange={setActiveTab} />
            </div>
            <div>
              <ReportsContent activeTab={activeTab} />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </Layout>
  );
};

export default page;
