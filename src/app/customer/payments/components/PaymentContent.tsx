import { BalancePayment } from "./BalancePayment";
import { CreditCardPayment } from "./CreditCardPayment";
import { WireTransferPayment } from "./WireTransferPayment";

interface PaymentContentProps {
  method: string | null;
}

export function PaymentContent({ method }: PaymentContentProps) {
  if (method === "Kredi Kartı") return <CreditCardPayment />;
  if (method === "Havale/EFT") return <WireTransferPayment />;
  if (method === "Bakiye") return <BalancePayment />;
}
