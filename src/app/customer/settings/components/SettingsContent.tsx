import React from "react";
import ProfileCard from "./ProfileCard";
import SecurityCard from "./SecurityCard";
import NotificationsCard from "./NotificationsCard ";
import PreferencesCard from "./PreferencesCard ";

type Props = {
  activeTab: string;
};

export default function SettingsContent({ activeTab }: Props) {
  return (
    <div className="mt-6 bg-white p-5  shadow">
      {activeTab === "profil" && <ProfileCard />}
      {activeTab === "guvenlik" && <SecurityCard />}
      {activeTab === "bildirimler" && <NotificationsCard />}
      {activeTab === "tercihler" && <PreferencesCard />}
    </div>
  );
}
