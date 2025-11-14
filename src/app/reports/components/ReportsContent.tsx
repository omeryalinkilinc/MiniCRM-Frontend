import CustomerGrowth from "./CustomerGrowth";
import TransactionStatusTrends from "./TransactionStatusTrends";

type Props = {
  activeTab: string;
};

export default function ReportsContent({ activeTab }: Props) {
  return (
    <div className="mt-6 bg-white p-5  shadow">
      {activeTab === "musteri buyumesi" && <CustomerGrowth />}
      {activeTab === "islem durumu trendleri" && <TransactionStatusTrends />}
    </div>
  );
}
