type Props = {
  activeTab: string;
  onChange: (tab: string) => void;
};

export default function ReportsTabs({ activeTab, onChange }: Props) {
  const tabs = [
    {
      key: "musteri buyumesi",
      label: "Müşteri Büyümesi",
    },
    {
      key: "islem durumu trendleri",
      label: "İşlem Durumu Trendleri",
    },
  ];

  return (
    <ul className="flex gap-3 bg-[#F1F5F9] p-3 rounded-xl">
      {tabs.map((tab) => (
        <li key={tab.key}>
          <button
            onClick={() => onChange(tab.key)}
            className={`flex gap-1 items-center px-10 py-3 rounded-xl cursor-pointer ${
              activeTab === tab.key ? "bg-white shadow font-semibold" : ""
            }`}
          >
            <span>{tab.label}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
