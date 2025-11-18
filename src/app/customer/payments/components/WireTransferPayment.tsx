import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { Input } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";

export function WireTransferPayment() {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="mt-4">
      <div className="flex gap-2 items-center bg-[#FCFDFE] p-2 rounded-lg border border-[#e1e7ef]">
        <span>
          <DocumentTextIcon className="w-6 h-6 text-yellow-500" />
        </span>
        <span className="text-sm">
          Havale/EFT işlemleri 1-2 iş günü içinde hesabınıza yansıyacaktır.
        </span>
      </div>

      <div className="p-4 border border-[#e1e7ef] rounded-md mt-4 bg-[#f8fafc]">
        <h3 className="font-medium mb-2">Havale/EFT Bilgileri</h3>

        <div className="mt-3 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-medium text-sm">IBAN Numarası*</label>
            <Controller
              name="iban"
              control={control}
              rules={{
                required: "IBAN zorunludur",
                minLength: {
                  value: 26,
                  message: "IBAN en az 26 karakter olmalı",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="TR00 0000 0000 0000 0000 0000 00"
                  className="border border-[#e1e7ef] font-mono pl-2 p-1 rounded-lg"
                />
              )}
            />
            {errors.iban?.message && (
              <span className="text-red-500">
                {String(errors.iban.message)}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium text-sm">Banka Adı*</label>
            <Controller
              name="bankName"
              control={control}
              rules={{ required: "Banka adı zorunludur" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Banka adını giriniz"
                  className="border border-[#e1e7ef] pl-2 p-1 rounded-lg"
                />
              )}
            />
            {errors.bankName?.message && (
              <span className="text-red-500">
                {String(errors.bankName.message)}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium text-sm">
              Referans Numarası(Opsiyonel)*
            </label>
            <Controller
              name="referenceNumber"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Dekont referans numarası"
                  className="border border-[#e1e7ef] pl-2 p-1 rounded-lg"
                />
              )}
            />
          </div>
        </div>
        <div className="flex gap-2 items-center bg-[#F9F6F1] p-2 rounded-lg border border-[#f59f0a33] mt-4">
          <span>
            <DocumentTextIcon className="w-4 h-4 text-yellow-500" />
          </span>
          <span className="text-xs">
            Havale/EFT ile yapılan ödemeler 1-2 iş günü içinde hesabınıza
            yansıyacaktır. Lütfen dekont bilgilerini saklayınız
          </span>
        </div>
      </div>
    </div>
  );
}
