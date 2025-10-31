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
import { DateInput } from "@mantine/dates";
import { NativeSelect } from "@mantine/core";
import { BarChart } from "@mantine/charts";
import { data } from "./data";
const page = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      const grid = GridStack.init(
        {
          column: 12,
          columnOpts: {
            breakpointForWindow: true,
            breakpoints: [{ w: 700, c: 1, layout: "list" as any }],
          },
          cellHeight: 100,
          disableResize: false,
          float: true,
          resizable: { handles: "e, se, s, sw, w" },
        },
        gridRef.current
      );
    }
  }, []);

  const [valueDate, setValueDate] = useState<string | null>(null);

  return (
    <Layout>
      <div className="grid-stack" ref={gridRef}>
        <div
          className="grid-stack-item bg-[#f0f6fe] rounded"
          gs-x="0"
          gs-y="0"
          gs-w="2"
          gs-h="2"
        >
          <div className="grid-stack-item-content">
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <span>
                <UsersIcon className="w-12 h-12 text-[#497cff]" />
              </span>
              <span>Toplam Müşteri</span>
              <span className="font-bold text-xl">5000</span>
            </div>
          </div>
        </div>

        <div
          className="grid-stack-item bg-[#f7f3fe] rounded"
          gs-x="3"
          gs-y="0"
          gs-w="2"
          gs-h="2"
        >
          <div className="grid-stack-item-content">
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <div className="flex items-center justify-center gap-10">
                <span>
                  <UserGroupIcon className="w-12 h-12 text-[#917fd2]" />
                </span>
                <span className="font-bold text-2xl">52%</span>
              </div>
              <span>Kurumsal Müşteri</span>
            </div>
          </div>
        </div>

        <div
          className="grid-stack-item bg-[#fef7f1] rounded"
          gs-x="6"
          gs-y="0"
          gs-w="2"
          gs-h="2"
        >
          <div className="grid-stack-item-content">
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <div className="flex items-center justify-center gap-10">
                <span>
                  <ChartBarIcon className="w-12 h-12 text-[#f3a252]" />
                </span>
                <span className="font-bold text-2xl">48%</span>
              </div>
              <span>Toplam İşlem</span>
            </div>
          </div>
        </div>

        <div
          className="grid-stack-item bg-[#fef1f0] rounded"
          gs-x="9"
          gs-y="0"
          gs-w="2"
          gs-h="2"
        >
          <div className="grid-stack-item-content">
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <div className="flex items-center justify-center gap-10">
                <span>
                  <ArrowTrendingUpIcon className="w-12 h-12 text-[#e84753]" />
                </span>
                <span className="font-bold text-2xl">22%</span>
              </div>
              <span>Son 30 Gun</span>
            </div>
          </div>
        </div>

        <div className="grid-stack-item " gs-x="0" gs-y="3" gs-w="4" gs-h="2">
          <div className="grid-stack-item-content border border-[#f2f2fa] p-4">
            <div className="flex gap-8 justify-between md:flex-row">
              <div>
                <label>Başlangıç Tarihi</label>
                <DateInput value={valueDate} onChange={setValueDate} />
              </div>
              <div>
                <label>Bitiş Tarihi</label>
                <DateInput value={valueDate} onChange={setValueDate} />
              </div>
              <div className="flex self-end">
                <button className="bg-[#1861ff] text-white p-3 rounded cursor-pointer">
                  Filtrele
                </button>
              </div>
            </div>
            <div>
              <NativeSelect
                label="Müşteri Türü"
                data={["Kobi", "Bireysel", "Kurumsal"]}
              />
            </div>
          </div>
        </div>

        <div className="grid-stack-item " gs-x="4" gs-y="3" gs-w="2" gs-h="3">
          <div className="grid-stack-item-content border border-[#f2f2fa]">
            <div className="flex justify-center flex-col items-center h-full gap-10">
              <div>
                <span className="text-[#2da369] flex items-center">
                  <PlusIcon className="w-11 h-11 font-bold" />
                  <span className="font-bold text-5xl">32%</span>
                </span>
              </div>

              <div className="flex flex-col">
                <span>Son 7 Gün</span>
                <span>İşlem Artışı</span>
              </div>

              <div className="flex flex-col">
                <span>Son güncelleme</span>
                <span>25 Eylül 2025, 14:45</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid-stack-item" gs-x="7" gs-y="3" gs-w="6" gs-h="5">
          <div className="grid-stack-item-content border border-[#f2f2fa] p-2">
            <div className="overflow-x-auto">
              <BarChart
                h={400}
                w="100%"
                data={data}
                dataKey="month"
                series={[{ name: "Smartphones", color: "cyan" }]}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default page;
