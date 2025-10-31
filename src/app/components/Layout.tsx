"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../hooks/useAuth";

const Layout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { role, loading } = useAuth();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Desktop */}
      <div className="hidden md:block w-[250px] bg-[#1b2d4b]">
        {role && <Sidebar role={role} />}
      </div>

      {/* Sidebar - Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-[#1b2d4b] md:hidden">
          {role && <Sidebar role={role} />}

          <button
            className="absolute top-4 right-4"
            onClick={() => setSidebarOpen(false)}
          >
            <XMarkIcon className="w-6 h-6 text-white" />
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="h-[80px]  flex items-center justify-between bg-[#fafcfe] sticky top-0 z-40">
          <Header />
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Bars3Icon className="w-6 h-6 text-[#4c8ae3]" />
          </button>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto  bg-[#F8FAFC]">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
