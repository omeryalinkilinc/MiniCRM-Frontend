"use client";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";
import {
  UsersIcon,
  UserGroupIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { Select } from "@mantine/core";
import { useAuth } from "../hooks/useAuth";
import ProtectedRoute from "../components/ProtectedRoute";

const page = () => {
  const { role, loading } = useAuth();
  if (loading || !role) return null;
  return (
    <Layout role={role}>
      <ProtectedRoute allowed={["admin"]}>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium  text-[#657182]">
              İş raporları oluşturun ve analiz edin
            </span>
            <button className="bg-[#066FF9] p-3 rounded-lg text-white flex cursor-pointer">
              Export Reports
            </button>
          </div>

          <div className="">
            <div></div>
          </div>
        </div>
      </ProtectedRoute>
    </Layout>
  );
};

export default page;
