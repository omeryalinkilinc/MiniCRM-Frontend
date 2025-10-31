import { Modal, Select, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import React, { useState } from "react";

type TransactionModalProps = {
  opened: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: {
    id?: number;
    transactionType: string;
    description: string;
    date: string;
    status: string;
    amount?: number;
  };
  customerId: number;
};

const TransactionModal = ({
  opened,
  onClose,
  onSuccess,
  initialData,
  customerId,
}: TransactionModalProps) => {
  const [transactionType, setTransactionType] = useState(
    initialData?.transactionType || ""
  );
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [date, setDate] = useState<Date | null>(
    initialData?.date ? new Date(initialData.date) : null
  );
  const [status, setStatus] = useState(initialData?.status || "Beklemede");
  const [amount, setAmount] = useState<number | undefined>(initialData?.amount);

  const handleSubmit = async () => {
    if (!transactionType || !description || !date || !status) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    console.log("Modal içindeki customerId:", customerId); // ✅ Log eklendi

    const payload = {
      transactionType,
      description,
      date: date.toISOString(),
      status,
      customerId, // ✅ Number() kaldırıldı
      amount: transactionType === "Ödeme" ? amount ?? 0 : null,
    };

    console.log("Gönderilen veri:", payload); // ✅ Log eklendi

    try {
      const res = await fetch(
        initialData?.id
          ? `http://localhost:5270/api/transactions/${initialData.id}`
          : "http://localhost:5270/api/transactions",
        {
          method: initialData?.id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        alert("İşlem başarısız oldu.");
      }
    } catch (error) {
      console.error("İşlem hatası:", error);
      alert("Sunucu hatası oluştu.");
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Yeni İşlem">
      <div className="flex flex-col gap-4">
        <Select
          label="İşlem Türü"
          placeholder="Seçiniz"
          data={["Ödeme", "Destek Talebi", "Başvuru"]}
          value={transactionType}
          onChange={(value) => setTransactionType(value ?? "")}
          required
        />

        <TextInput
          label="Açıklama"
          placeholder="İşlem açıklaması girin"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          required
        />

        <DateInput
          label="Tarih"
          value={date}
          onChange={(value) => {
            if (value) {
              setDate(new Date(value));
            } else {
              setDate(null);
            }
          }}
        />

        <Select
          label="Durum"
          placeholder="Seçiniz"
          data={["Beklemede", "Tamamlandı", "İptal Edildi"]}
          value={status}
          onChange={(value) => setStatus(value ?? "")}
        />

        {transactionType === "Ödeme" && (
          <TextInput
            label="Tutar"
            placeholder="₺"
            type="number"
            value={amount ?? ""}
            onChange={(e) => setAmount(parseFloat(e.currentTarget.value))}
            required
          />
        )}
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={onClose}
          className="border px-4 py-2 rounded text-gray-700 hover:bg-gray-100"
        >
          Vazgeç
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {initialData ? "Güncelle" : "Ekle"}
        </button>
      </div>
    </Modal>
  );
};

export default TransactionModal;
