"use client";
import { Modal, TextInput, NumberInput, Select, Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface CustomerFormProps {
  opened: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Customer;
}

interface Customer {
  id?: number;
  name: string;
  company: string;
  transactionCount: number;
  customerType: string;
  registrationDate: string;
}

export default function CustomerForm({
  opened,
  onClose,
  onSuccess,
  initialData,
}: CustomerFormProps) {
  const [formData, setFormData] = useState<Customer>({
    name: "",
    company: "",
    transactionCount: 0,
    customerType: "",
    registrationDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    setFormData(
      initialData ?? {
        name: "",
        company: "",
        transactionCount: 0,
        customerType: "",
        registrationDate: new Date().toISOString().split("T")[0],
      }
    );
  }, [initialData, opened]);

  const handleSubmit = async () => {
    // 🔍 Validasyon
    if (!formData.name.trim()) {
      toast.error("Lütfen müşteri adı girin");
      return;
    }
    if (!formData.company.trim()) {
      toast.error("Lütfen şirket adını girin");
      return;
    }
    if (formData.transactionCount <= 0) {
      toast.error("İşlem sayısı pozitif olmalı");
      return;
    }
    if (!formData.customerType) {
      toast.error("Lütfen müşteri türünü seçin");
      return;
    }

    const method = formData.id ? "PUT" : "POST";
    const url = formData.id
      ? `http://localhost:5270/api/customers/${formData.id}`
      : "http://localhost:5270/api/customers";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(
          formData.id
            ? `${formData.name} güncellendi`
            : `${formData.name} eklendi`
        );
        onSuccess();
        onClose();
      } else {
        const error = await res.text();
        console.error("API Hatası:", error);
        toast.error("İşlem başarısız oldu. Lütfen tekrar deneyin.");
      }
    } catch (err) {
      console.error("İstek hatası:", err);
      toast.error("Sunucuya ulaşılamadı.");
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Yeni Müşteri Ekle">
      <TextInput
        label="Ad"
        value={formData.name}
        onChange={(e) =>
          setFormData({ ...formData, name: e.currentTarget.value })
        }
      />
      <TextInput
        label="Şirket"
        value={formData.company}
        onChange={(e) =>
          setFormData({ ...formData, company: e.currentTarget.value })
        }
      />
      <NumberInput
        label="İşlem Sayısı"
        value={formData.transactionCount}
        onChange={(val) =>
          typeof val === "number" &&
          setFormData({ ...formData, transactionCount: val })
        }
      />
      <Select
        label="Müşteri Türü"
        data={["Kurumsal", "KOBİ", "Bireysel"]}
        value={formData.customerType}
        onChange={(val) =>
          val && setFormData({ ...formData, customerType: val })
        }
      />
      <Button fullWidth mt="md" onClick={handleSubmit}>
        Kaydet
      </Button>
    </Modal>
  );
}
