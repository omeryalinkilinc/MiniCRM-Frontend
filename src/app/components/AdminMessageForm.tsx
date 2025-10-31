import React from "react";
import { sendAdminMessage } from "@/lib/api/messages";

type Props = {
  adminId: number;
  users: { id: number; name: string }[];
};

const AdminMessageForm = ({ adminId, users }: Props) => {
  return (
    <div>
      <div></div>
    </div>
  );
};

export default AdminMessageForm;
