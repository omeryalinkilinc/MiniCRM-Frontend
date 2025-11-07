"use client";
import Layout from "@/app/components/Layout";
import React, { useEffect, useState } from "react";
import { Table } from "@mantine/core";
import { getCustomerInfo } from "@/lib/api/customer";
import TransactionModal from "@/app/components/TransactionModal";
import { fetchTransactions } from "@/lib/api/transactions";
import { PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/app/hooks/useAuth";
import ProtectedRoute from "@/app/components/ProtectedRoute";

type CustomerInfo = {
  id: number; // ✅ bu alan olmalı
  customerType: string;
  companyName: string;
  photoUrl?: string;
};

type Transaction = {
  id?: number;
  transactionType: string;
  description: string;
  date: string;
  status: string;
  amount?: number;
  customerId: number;
};

const Page = () => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [opened, setOpened] = useState(false);
  const [editData, setEditData] = useState<Transaction | undefined>(undefined);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number>(1); // örnek ID

  useEffect(() => {
    getCustomerInfo().then((info) => {
      console.log("Gelen müşteri bilgisi:", info); // 🔍 burada id var mı?
      setCustomerInfo(info);
      setSelectedCustomerId(info.id); // ❗ info.id undefined ise NaN olur
    });
  }, []);

  useEffect(() => {
    if (selectedCustomerId) {
      fetchTransactions(selectedCustomerId).then((data) => {
        setTransactions(data);
      });
    }
  }, [selectedCustomerId]);

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
      <ProtectedRoute allowed={["customer"]}>
        <div className="m-2">
          <div className="flex items-center justify-between">
            {customerInfo && (
              <div className="flex flex-col">
                <span className="text-lg font-medium  text-[#657182]">
                  {customerInfo.customerType}
                </span>
                <span className="font-bold text-xl">
                  {customerInfo.companyName}
                </span>
              </div>
            )}
            <div>
              <button
                className="pt-2 pb-2 pl-5 pr-5 bg-[#3d67f7] text-white rounded cursor-pointer"
                onClick={() => {
                  setEditData(undefined);
                  setOpened(true);
                }}
              >
                <div className="flex items-center">
                  <PlusIcon className="w-7 h-7" />
                  <span>Yeni İşlem </span>
                </div>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center bg-[#fff] mt-5  border-2 border-[#f3f5f8] rounded-xl">
            <Table highlightOnHover striped className=" table-fixed">
              <thead className=" rounded-xl">
                <tr>
                  <th className="w-[150px] text-left p-5 text-lg text-[#657182]">
                    İşlem
                  </th>
                  <th className="w-[150px] text-left p-5 text-lg text-[#657182]">
                    Durum
                  </th>
                  <th className="w-[150px] text-left p-5 text-lg text-[#657182]">
                    Tarih
                  </th>
                  <th className="w-[150px] text-left p-5 text-lg text-[#657182]">
                    İşlem
                  </th>
                </tr>
              </thead>
              <tbody className="border-2 border-[#f3f5f8] border-b-3">
                {transactions.map((t) => (
                  <tr key={t.id} className="border-b border-[#f3f5f8] ">
                    <td className="text-left truncate p-5 font-bold text-m">
                      {t.transactionType}
                    </td>
                    <td className="text-left truncate px-2 py-1">
                      <span
                        className={`px-2 py-1 rounded-full  font-bold ${getStatusClass(
                          t.status
                        )}`}
                      >
                        {t.status}
                      </span>
                    </td>

                    <td className="text-left">
                      {new Date(t.date).toLocaleDateString("tr-TR")}
                    </td>
                    <td className="text-left">
                      <button
                        className=" p-1  cursor-pointer flex gap-1 items-center"
                        onClick={() => {
                          setEditData(t);
                          setOpened(true);
                        }}
                      >
                        <PencilSquareIcon className="w-8 h-8" />
                        <span className="font-bold text-m">Düzenle</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>

        <TransactionModal
          opened={opened}
          onClose={() => setOpened(false)}
          onSuccess={() => fetchTransactions(selectedCustomerId)}
          initialData={editData}
          customerId={selectedCustomerId}
        />
      </ProtectedRoute>
    </Layout>
  );
};

export default Page;
