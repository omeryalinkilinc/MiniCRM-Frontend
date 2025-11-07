import React, { useState } from "react";
import { Switch } from "@mantine/core";
export default function NotificationsCard() {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <div className="flex flex-col gap-2">
        <span className="font-bold text-2xl">Bildirim Tercihleri</span>
        <span className="text-sm font-medium  text-[#657182]">
          Hangi bildirimleri almak istediğinizi seçin
        </span>
      </div>

      <div className="mt-10 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-bold text-sm">E-posta Bildirimleri</span>
            <span className="text-sm font-medium  text-[#657182]">
              İşlem güncellemeleri için e-posta alın
            </span>
          </div>
          <div>
            <Switch defaultChecked size="md" />
          </div>
        </div>

        <div className="flex items-center justify-between border-t-[1px] border-[#E1ECF5]">
          <div className="flex flex-col gap-1 pt-6">
            <span className="font-bold text-sm">SMS Bildirimleri</span>
            <span className="text-sm font-medium  text-[#657182]">
              Önemli işlemler için SMS alın
            </span>
          </div>
          <div>
            <Switch defaultChecked size="md" />
          </div>
        </div>

        <div className="flex items-center justify-between border-t-[1px] border-[#E1ECF5]">
          <div className="flex flex-col gap-1 pt-6">
            <span className="font-bold text-sm">Pazarlama Bildirimleri</span>
            <span className="text-sm font-medium  text-[#657182]">
              Kampanyalar ve tekliflerden haberdar olun
            </span>
          </div>
          <div>
            <Switch defaultChecked size="md" />
          </div>
        </div>

        <div className="flex items-center justify-between border-t-[1px] border-[#E1ECF5]">
          <div className="flex flex-col gap-1 pt-6">
            <span className="font-bold text-sm">Sistem Bildirimleri</span>
            <span className="text-sm font-medium  text-[#657182]">
              Sistem güncellemeleri ve bakım bildirimleri
            </span>
          </div>
          <div>
            <Switch defaultChecked size="md" />
          </div>
        </div>
      </div>
    </div>
  );
}
