"use client";
import { useState, useEffect, useRef } from "react";
import { sendAdminMessage, sendSupportMessage } from "@/lib/api/messages";
import { getMessagesForUser } from "../customer/support/data";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";

type Message = {
  id: number;
  content: string;
  sentAt: string;
  senderUserId: number;
  senderFullName: string;
};

export default function MessagePanel({
  userId,
  isAdmin,
}: {
  userId: number;
  isAdmin: boolean;
}) {
  const [content, setContent] = useState("");
  const [receiverId, setReceiverId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMessagesForUser(userId).then(setMessages).catch(console.error);
  }, [userId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    try {
      if (!content.trim()) return;

      if (isAdmin) {
        if (!receiverId) return;
        await sendAdminMessage({ receiverUserId: receiverId, content });
      } else {
        await sendSupportMessage({ content });
      }

      setContent("");
      getMessagesForUser(userId).then(setMessages);
    } catch (err) {
      console.error("Mesaj gönderilemedi", err);
    }
  };

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
  );

  return (
    <div className="flex flex-col h-[500px] border border-[#e1e7ef] rounded-lg overflow-hidden ">
      {/* Başlık */}
      <div className="flex items-center gap-4 p-4 border-b border-[#e1e7ef]">
        <span className="font-bold text-2xl">Canlı Destek</span>
        <ChatBubbleOvalLeftIcon className="w-8 h-8 text-sky-500" />
      </div>

      {/* Mesajlar */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#fff]">
        {sortedMessages.map((msg: any) => {
          const isUser = msg.senderUserId === userId;
          return (
            <div
              key={msg.id}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  isUser
                    ? "bg-[#066FF9] text-white"
                    : "bg-white border border-[#e1e7ef]"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <span className="text-xs text-gray-400 block mt-1 text-right">
                  {new Date(msg.sentAt).toLocaleTimeString("tr-TR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={scrollRef} />
      </div>

      {/* Mesaj gönderme alanı */}
      <div className="border-t border-[#e1e7ef] p-4 bg-white">
        <div className="flex gap-2 items-end">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Mesajınızı yazın..."
            className="flex-1 border border-[#e1e7ef] rounded-lg px-4 py-2 bg-[#F8FAFC] resize-none"
          />
          {isAdmin && (
            <input
              type="number"
              placeholder="Alıcı ID"
              value={receiverId ?? ""}
              onChange={(e) => setReceiverId(Number(e.target.value))}
              className="border rounded p-2 w-24"
            />
          )}
          <button
            onClick={handleSend}
            className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600"
          >
            Gönder
          </button>
        </div>
      </div>
    </div>
  );
}
