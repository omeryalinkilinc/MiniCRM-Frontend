"use client"; // Next.js client component
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import Header from "../components/Header"; // Üst bar
import Sidebar from "../components/Sidebar"; // Sol menü
import Layout from "../components/Layout"; // Sayfa düzeni
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid"; // İkonlar

import { Modal, Button, Table } from "@mantine/core"; // Mantine bileşenleri
import CustomerForm from "../components/CustomerForm"; // Müşteri formu bileşeni
import { useDisclosure } from "@mantine/hooks"; // Modal kontrol hook'u
import { useAuth } from "../hooks/useAuth";
import ProtectedRoute from "../components/ProtectedRoute";

// Müşteri tipi tanımı
type Customer = {
  id: number;
  name: string;
  email?: string;
  company: string;
  transactionCount: number;
  customerType: string;
  registrationDate: string;
};

const page = () => {
  const router = useRouter();

  // Müşteri listesi
  const [customers, setCustomers] = useState<Customer[]>([]);

  // Modal kontrolü (ekle/düzenle)
  const [opened, { open, close }] = useDisclosure(false);

  // Düzenleme için seçilen müşteri
  const [editData, setEditData] = useState<Customer | undefined>(undefined);

  // Silme modalı kontrolü
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Silinecek müşteri ID
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Silinecek müşteri nesnesi (isim göstermek için)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  // Arama metni
  const [searchTerm, setSearchTerm] = useState("");

  // Müşteri verilerini çek
  const fetchCustomers = async () => {
    const res = await fetch("http://localhost:5270/api/customers", {
      credentials: "include",
    });
    const data = await res.json();
    setCustomers(data);
  };

  // Sayfa ilk yüklendiğinde verileri çek
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Düzenleme butonuna basıldığında modalı aç
  const handleEdit = (customer: Customer) => {
    setEditData(customer);
    open();
  };

  // Yeni müşteri butonuna basıldığında modalı aç
  const handleNew = () => {
    setEditData(undefined);
    open();
  };

  // Silme modalını aç
  const openConfirm = (customer: Customer) => {
    setSelectedCustomer(customer);
    setSelectedId(customer.id);
    setConfirmOpen(true);
  };

  // Silme işlemini onayla
  const handleConfirmDelete = async () => {
    if (selectedId !== null) {
      const res = await fetch(
        `http://localhost:5270/api/customers/${selectedId}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        fetchCustomers(); // tabloyu yenile
        setConfirmOpen(false); // modalı kapat
        setSelectedId(null); // seçimi temizle
      }
    }
  };

  // Arama filtresi
  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCustomerIcon = (type: string) => {
    switch (type) {
      case "KOBI":
        return "/assets/img/sme.png";
      case "Bireysel":
        return "/assets/img/user.png";
      case "Kurumsal":
        return "/assets/img/institutional.png";
    }
  };

  const { role, loading } = useAuth();
  if (loading) return <div>Yükleniyor...</div>;

  if (role !== "admin") {
    router.replace("/login"); // veya "/unauthorized"
    return null;
  }

  console.log("Rol:", role);

  return (
    <Layout role={role}>
      <ProtectedRoute allowed={["admin"]}>
        <div className="p-5">
          {/* Üst arama ve butonlar */}
          <div className="flex justify-between">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                className="border-none h-12 w-full md:w-[500px] pl-9 rounded bg-[#eff3fd]"
              />
              <MagnifyingGlassIcon className="w-6 h-6 cursor-pointer text-[#5490f0] absolute left-2 top-3" />
            </div>

            <div className="flex">
              <ul className="flex items-center justify-center md:flex-row gap-4 md:gap-6 mt-4 md:mt-0">
                <li
                  className="bg-[#4d7fdb] p-3 rounded-xl text-white flex cursor-pointer"
                  onClick={handleNew}
                >
                  <PlusIcon className="w-6 h-6" />
                  <span>Yeni Müsteri</span>
                </li>

                {/* Müşteri formu modalı */}
                <CustomerForm
                  opened={opened}
                  onClose={close}
                  onSuccess={fetchCustomers}
                  initialData={editData ?? undefined}
                />

                {/* Filtre ve sıralama butonları */}
                <li>
                  <button className="border-2 border-[#eff2f5] p-2 pl-4 pr-4 rounded cursor-pointer">
                    Filtreler
                  </button>
                </li>
                <li>
                  <button className="border-2 border-[#eff2f5] p-2 pl-4 pr-4 rounded cursor-pointer">
                    Yeni - Eski
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Müşteri tablosu */}
          <Table
            highlightOnHover
            striped
            className="w-full mt-6 table-fixed bg-[#fff] rounded-xl"
          >
            <thead className="bg-[#ffff] rounded-xl">
              <tr>
                <th colSpan={5} className="p-6 text-left">
                  <h5 className="font-bold text-xl">Tüm Müşteriler</h5>
                </th>
              </tr>
              <tr className="p-6">
                <th className="w-[150px] text-left p-4 text-[#5C6673]">
                  Müşteri Türü
                </th>
                <th className="w-[150px] text-left text-[#5C6673] ">
                  Ad - Soyad
                </th>
                <th className="w-[150px] text-left text-[#5C6673]">E-posta</th>
                <th className="w-[150px] text-left text-[#5C6673]">Şirket</th>
                <th className="w-[150px] text-left text-[#5C6673]">
                  İşlem Sayısı
                </th>
                <th className="w-[150px] text-left text-[#5C6673]">
                  Kayıt Tarihi
                </th>
                <th className="w-[150px] text-left text-[#5C6673]">Actions</th>
              </tr>
            </thead>
            <tbody className="border-2 border-[#f3f5f8] border-b-3">
              {filteredCustomers.map((c) => (
                <tr key={c.id} className="border-b border-[#f3f5f8]">
                  <td className="text-left p-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={getCustomerIcon(c.customerType)}
                        alt={c.customerType}
                        width={30}
                        height={30}
                      />

                      <span>{c.customerType}</span>
                    </div>
                  </td>
                  <td className="text-left truncate font-medium">{c.name}</td>
                  <td className="text-left truncate text-[#5C6673]">
                    {c.email}
                  </td>

                  <td className="text-left truncate">{c.company}</td>
                  <td className="text-left">{c.transactionCount}</td>
                  <td className="text-left">
                    {new Date(c.registrationDate).toLocaleDateString("tr-TR")}
                  </td>
                  <td>
                    <div className="flex gap-4">
                      <button
                        className="text-blue-600 hover:underline flex cursor-pointer items-center"
                        onClick={() => handleEdit(c)}
                      >
                        <PencilSquareIcon className="w-5 h-5" />
                        Düzenle
                      </button>
                      <button
                        className="text-red-600 hover:underline flex cursor-pointer "
                        onClick={() => openConfirm(c)}
                      >
                        <TrashIcon className="w-5 h-5" />
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Silme onay modalı */}
          <Modal
            opened={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            title="Müşteri Silme Onayı"
          >
            <p className="mb-4">
              <strong>{selectedCustomer?.name}</strong> adlı müşteriyi silmek
              istediğinize emin misiniz?
            </p>
            <div className="flex justify-end gap-4">
              <Button variant="default" onClick={() => setConfirmOpen(false)}>
                Vazgeç
              </Button>
              <Button color="red" onClick={handleConfirmDelete}>
                Sil
              </Button>
            </div>
          </Modal>
        </div>
      </ProtectedRoute>
    </Layout>
  );
};

export default page;
