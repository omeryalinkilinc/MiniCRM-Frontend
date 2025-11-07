import { useEffect, useState } from "react";
import { getInboxMessage } from "@/lib/api/messages";

export default function AdminInbox({ adminId }: { adminId: number }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getInboxMessage(adminId).then(setMessages).catch(console.error);
  }, [adminId]);

  return (
    <div className="space-y-4 mt-5">
      {messages.map((msg: any) => (
        <div
          key={msg.id}
          className="bg-white border border-[#e0e5eb] p-6 rounded-lg"
        >
          <div className="flex gap-3 text-sm text-[#5C6673] mb-2">
            <span className="font-medium text-[#1d2530]">
              Kullanıcı #{msg.senderUserId}
            </span>
            <span>mail@example.com</span> {/* opsiyonel */}
            <span>{new Date(msg.sentAt).toLocaleString()}</span>
          </div>
          <p className="text-[#1d2530]">{msg.content}</p>
        </div>
      ))}
    </div>
  );
}
