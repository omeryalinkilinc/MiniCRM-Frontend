import { WalletIcon } from "@heroicons/react/24/outline";

export function BalancePayment() {
  return (
    <div className="flex gap-2 items-center bg-[#f1f5f980] p-4 rounded-lg border border-[#e1e7ef] mt-4">
      <span>
        <WalletIcon className="w-6 h-6 text-green-500" />
      </span>
      <span className="text-sm">
        Mevcut bakiyenizden düşülecek ve anında işlem tamamlanacaktır.
      </span>
    </div>
  );
}
