import React from "react";
import {
  UserIcon,
  LockClosedIcon,
  BellIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

type Props = {
  activeTab: string;
  onChange: (tab: string) => void;
};

export default function SettingsTabs({ activeTab, onChange }: Props) {
  const tabs = [
    {
      key: "profil",
      label: "Profil",
      icon: <UserIcon className="w-6 h-6" />,
    },
    {
      key: "guvenlik",
      label: "Güvenlik",
      icon: <LockClosedIcon className="w-6 h-6" />,
    },
    {
      key: "bildirimler",
      label: "Bildirimler",
      icon: <BellIcon className="w-6 h-6" />,
    },
    /*
    {
      key: "tercihler",
      label: "Tercihler",
      icon: <CogIcon className="w-6 h-6" />,
    },
    */
  ];

  return (
    <ul className="flex gap-2 justify-around bg-[#F1F5F9] p-3 rounded-xl">
      {tabs.map((tab) => (
        <li key={tab.key}>
          <button
            onClick={() => onChange(tab.key)}
            className={`flex gap-1 items-center px-10 py-3 rounded-xl cursor-pointer ${
              activeTab === tab.key ? "bg-white shadow font-semibold" : ""
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
