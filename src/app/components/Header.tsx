"use client";
import { usePathname, useRouter } from "next/navigation";
import { Avatar } from "@mantine/core";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { BellIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Menu } from "@mantine/core";
import { getInitials } from "@/app/utils/string";

const Header = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch("http://localhost:5270/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) {
      console.log("Çıkış başarılı");
      router.replace("/login");
    } else {
      console.error("Çıkış başarısız");
    }
  };

  const pathname = usePathname();
  const titles = {
    dashboard: "Panel",
    customers: "Müşteriler",
    reports: "Raporlar",
    settings: "Ayarlar",
    home: "Ana Sayfa",
    transactions: "İşlemlerim",
    help: "Destek",
  };

  const rawPath = pathname.split("/")[1] || "dashboard";
  const pageTitle = titles[rawPath as keyof typeof titles] || "Panel";

  type User = {
    fullName: string;
    email: string;
    photoUrl?: string;
  };

  const [user, setUser] = useState<{ fullName: string; email: string } | null>(
    null
  );

  useEffect(() => {
    fetch("http://localhost:5270/api/auth/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setUser({
          fullName: data.user.fullName,
          email: data.user.email,
        });
      });
  }, []);

  return (
    <div className="h-[80px] pr-4 pl-4 flex items-center bg-[#fff] flex-1">
      <div className="w-full flex justify-between items-center">
        <div>
          <h1 className="font-bold text-3xl">{pageTitle} </h1>
        </div>

        <div>
          <ul className="flex gap-6 items-center">
            <li className="cursor-pointer">
              <BellIcon className="w-6 h-6" />
            </li>

            <li className="flex items-center gap-1">
              <span>Hoş Geldin, {user?.fullName}</span>

              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Avatar
                    radius="xl"
                    size="md"
                    color="cyan"
                    className="cursor-pointer"
                  >
                    {user?.fullName ? getInitials(user.fullName) : "?"}
                  </Avatar>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>{user?.fullName}</Menu.Label>
                  <Menu.Item onClick={() => router.push("/settings")}>
                    Profil Ayarları
                  </Menu.Item>
                  <Menu.Item onClick={handleLogout}>Çıkış Yap</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
