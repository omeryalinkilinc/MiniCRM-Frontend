"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import {
  Squares2X2Icon,
  UserGroupIcon,
  DocumentChartBarIcon,
  Cog6ToothIcon,
  UserIcon,
  ReceiptPercentIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";

type Role = "admin" | "customer";

const Sidebar = ({ role }: { role: Role }) => {
  const router = useRouter();
  const pathname = usePathname();
  const current = pathname.split("/")[1] || "dashboard";

  const menuItems =
    role === "admin"
      ? [
          {
            label: "Dashboard",
            icon: <Squares2X2Icon className="w-5 h-5" />,
            href: "/dashboard",
          },
          {
            label: "Customers",
            icon: <UserGroupIcon className="w-5 h-5" />,
            href: "/customers",
          },
          {
            label: "Reports",
            icon: <DocumentChartBarIcon className="w-5 h-5" />,
            href: "/reports",
          },
          {
            label: "Settings",
            icon: <Cog6ToothIcon className="w-5 h-5" />,
            href: "/settings",
          },
        ]
      : [
          {
            label: "Ana Sayfa",
            icon: <Squares2X2Icon className="w-5 h-5" />,
            href: "/customer/home",
          },
          {
            label: "İşlemlerim",
            icon: <ReceiptPercentIcon className="w-5 h-5" />,
            href: "/customer/transactions",
          },

          {
            label: "Destek",
            icon: <QuestionMarkCircleIcon className="w-5 h-5" />,
            href: "/customer/support",
          },
          {
            label: "Settings",
            icon: <Cog6ToothIcon className="w-5 h-5" />,
            href: "/settings",
          },
        ];

  return (
    <div className="hidden md:block bg-[#1b2d4b] w-[250px] h-screen">
      <div className="flex flex-col items-center">
        <div className="p-4 pt-[28px]">
          <h1 className="font-bold text-white text-2xl">MiniCRM</h1>
        </div>
        <div className="text-white text-xl w-full">
          <ul className="flex flex-col gap-4 w-full px-4">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li
                  key={item.label}
                  onClick={() => router.push(item.href)}
                  className={`w-full pl-4 py-2 rounded cursor-pointer text-white text-lg text-left font-semibold flex items-center gap-3
                    ${isActive ? "bg-[#70a1e8]" : "hover:bg-blue-400"}`}
                >
                  {item.icon}
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
