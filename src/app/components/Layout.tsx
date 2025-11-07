"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { XMarkIcon } from "@heroicons/react/24/solid";
import type { Role } from "../hooks/useAuth"; // Role tipini doğru şekilde import ediyoruz

type LayoutProps = {
  children: React.ReactNode;
  role: Role;
};

const Layout = ({ children, role }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:block w-[250px] bg-[#1b2d4b] sticky top-0 h-screen overflow-y-auto">
        <Sidebar role={role} />
      </aside>

      {/* Sidebar - Mobile */}
      <div
        className={`fixed top-0 left-0 w-full h-[300px] z-50 transition-transform duration-300 
        ${sidebarOpen ? "translate-y-0" : "-translate-y-full"} md:hidden`}
      >
        <Sidebar role={role} />
        <button
          className="absolute top-4 right-4"
          onClick={() => setSidebarOpen(false)}
        >
          <XMarkIcon className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <header className="h-[80px] flex items-center justify-between bg-[#fafcfe] sticky top-0 z-40">
          <Header onToggleSidebar={() => setSidebarOpen(true)} />
        </header>

        <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
