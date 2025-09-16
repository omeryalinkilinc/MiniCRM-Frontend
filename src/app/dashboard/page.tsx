"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const page = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("http://localhost:5270/api/auth/me", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        router.replace("/login");
      }
    };
    checkAuth();
  }, []);

  return (
    <div>
      <div className="flex h-screen">
        {/* Sol taraf (Sidebar) */}
        <Sidebar />

        {/* Sağ taraf (Header + içerik) */}
        <div className="flex flex-1">
          <Header />
        </div>
      </div>
      <main className=""></main>
    </div>
  );
};

export default page;
