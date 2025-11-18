import {
  IdentificationIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { Controller, useFormContext } from "react-hook-form";

export function CreditCardPayment() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className=" mt-4 ">
      <div>
        <div className="flex gap-2 items-center bg-[#FCFDFE] p-4 rounded-lg border border-[#e1e7ef]">
          <span>
            <IdentificationIcon className="w-6 h-6 text-blue-600" />
          </span>
          <span className="text-sm">
            Kredi kartı ile ödeme işleminiz anında gerçekleşecektir.
          </span>
        </div>
      </div>

      <div className="p-4 border border-[#e1e7ef] rounded-md mt-4 bg-[#f1f5f94d]">
        <h3 className="font-medium mb-2">Kredi Kartı Bilgileri</h3>
        <div className="flex flex-col gap-4">
          <div className="w-full flex flex-col gap-1">
            <label className="font-medium text-sm">Kart Numarası*</label>

            <Controller
              name="cardNumber"
              control={control}
              rules={{
                required: "Kart numarası zorunludur",
                minLength: {
                  value: 16,
                  message: "Kart numarası 16 haneli olmalı",
                },
                maxLength: {
                  value: 16,
                  message: "Kart numarası 16 haneli olmalı",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  className="border border-[#e1e7ef] rounded-md w-full px-3 py-2"
                  placeholder="1234 5678 9012 3456"
                  type="number"
                />
              )}
            />
            {errors.cardNumber?.message && (
              <span className="text-red-500">
                {String(errors.cardNumber.message)}
              </span>
            )}
          </div>
          <div className="w-full flex flex-col gap-1">
            <label className="font-medium text-sm">Kart Sahibi*</label>

            <Controller
              name="cardHolder"
              control={control}
              rules={{
                required: "Kart sahibi AD - SOYAD zorunludur",
                minLength: {
                  value: 3,
                  message: "Kart sahibi adı en az 3 karakter olmalı",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  className="border border-[#e1e7ef] rounded-md px-3 py-2"
                  placeholder="AD SOYAD"
                  type="text"
                />
              )}
            />
            {errors.cardHolder?.message && (
              <span className="text-red-500">
                {String(errors.cardHolder.message)}
              </span>
            )}
          </div>
          <div className="w-full flex gap-2">
            <div className="flex flex-col gap-1 w-full">
              <label className="font-medium text-sm">Son Kullanma</label>
              <Controller
                name="expiry"
                control={control}
                rules={{
                  required: "Son kullanma tarihi zorunludur",
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/\d{2}$/, // AA/YY formatı
                    message: "Geçerli format (AA/YY) olmalı",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    className="border border-[#e1e7ef] rounded-md px-3 py-2 w-full"
                    placeholder="(AA/YY)"
                    type="text"
                  />
                )}
              />

              {errors.expiry?.message && (
                <span className="text-red-500">
                  {String(errors.expiry.message)}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="font-medium text-sm">CVV*</label>
              <Controller
                name="cvv"
                control={control}
                rules={{
                  required: "CVV zorunludur",
                  minLength: {
                    value: 3,
                    message: "CVV en az 3 haneli olmalı",
                  },
                  maxLength: {
                    value: 3,
                    message: "CVV en fazla 3 haneli olabilir",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    className="border border-[#e1e7ef] rounded-md px-3 py-2 w-full"
                    placeholder="123"
                    type="text" // 🔑 CVV için text daha uygun, çünkü 3-4 haneli sayı
                    inputMode="numeric"
                  />
                )}
              />

              {errors.cvv?.message && (
                <span className="text-red-500">
                  {String(errors.cvv.message)}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2 items-center bg-[#F3FBFD] p-2 rounded-lg border border-[#11b4d433] mt-4">
          <span>
            <LockClosedIcon className="w-4 h-4 text-[#11b4d4]" />
          </span>
          <span className="text-xs">
            Bu işlem hesabınıza kayıtlı olarak oluşturulacaktır. İşlem sonrası
            fatura ve dekont bilgilerine erişebilirsiniz
          </span>
        </div>
      </div>
    </div>
  );
}
