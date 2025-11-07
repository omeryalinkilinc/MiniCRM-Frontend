"use client";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import ClientNativeSelect from "../components/ClientNativeSelect";
import { getInboxWithUser } from "./data";
import { useUserInfo } from "../hooks/useUserInfo";
import { useAuth } from "../hooks/useAuth";
import ProtectedRoute from "../components/ProtectedRoute";

const page = () => {
  const user = useUserInfo();
  const [messages, setMessages] = useState([]);
  const [replyToUserId, setReplyToUserId] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (user && user.role === "Admin") {
      getInboxWithUser(user.id).then(setMessages).catch(console.error);
    }
  }, [user]);

  async function handleSendReply(receiverUserId: number) {
    if (!replyContent.trim()) return;

    try {
      await fetch("http://localhost:5270/api/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          receiverUserId,
          content: replyContent,
        }),
      });

      setReplyToUserId(null);
      setReplyContent("");
      if (!user) return;
      const updated = await getInboxWithUser(user.id);
      setMessages(updated);
    } catch (err) {
      console.error("Yanıt gönderilemedi", err);
    }
  }

  const conversations = messages.reduce((acc: any, msg: any) => {
    const key =
      msg.senderUserId !== user?.id ? msg.senderUserId : msg.receiverUserId;
    acc[key] = acc[key] || [];
    acc[key].push(msg);
    return acc;
  }, {});

  const filteredConversations = Object.entries(conversations).filter(
    ([userId, msgs]: any) => {
      const latestCustomerMessage = msgs
        .slice()
        .reverse()
        .find((m: any) => m.senderUserId !== user?.id);

      const searchMatch =
        !searchTerm ||
        latestCustomerMessage?.senderFullName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        latestCustomerMessage?.senderEmail
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      return searchMatch;
    }
  );

  // gelen mesaja göre sırala
  const sortedConversations = filteredConversations.sort((a: any, b: any) => {
    const getLastMessage = (msgs: any[]) =>
      msgs.reduce((latest, current) =>
        new Date(current.sentAt) > new Date(latest.sentAt) ? current : latest
      );

    const aLast = getLastMessage(a[1]);
    const bLast = getLastMessage(b[1]);

    return new Date(bLast.sentAt).getTime() - new Date(aLast.sentAt).getTime();
  });

  const { role, loading } = useAuth();
  if (loading || !role) return null;

  return (
    <Layout role={role}>
      <ProtectedRoute allowed={["admin"]}>
        <div className="p-6">
          <span className="text-lg font-medium text-[#657182]">
            Müşteri sorularını yönetin ve yanıtlayın
          </span>

          <div className="flex items-center gap-2 mt-5">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search by customer or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 w-full pl-9 rounded-lg border border-[#e0e5eb] bg-[#F9FAFB]"
              />

              <MagnifyingGlassIcon className="w-6 h-6 text-[#5490f0] absolute left-2 top-2" />
            </div>
            <ClientNativeSelect
              data={["All Status", "Pending", "Answered", "Closed"]}
              className="p-1 rounded-lg bg-[#F9FAFB]"
            />
          </div>

          <div className="space-y-4 mt-5">
            {sortedConversations.map(([userId, msgs]: any) => {
              const sorted = msgs.sort(
                (a: any, b: any) =>
                  new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
              );
              const lastCustomerMessage = [...sorted]
                .reverse()
                .find((m: any) => m.senderUserId !== user?.id);

              return (
                <div
                  key={userId}
                  className="border border-[#e0e5eb] p-6 rounded-lg bg-white space-y-4"
                >
                  {/* Müşteri bilgisi */}
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold text-lg text-[#1d2530]">
                        {lastCustomerMessage?.senderFullName}
                      </span>
                      <span className="text-sm text-[#657182] ml-2">
                        ({lastCustomerMessage?.senderEmail})
                      </span>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <span className="px-2 py-1 rounded bg-[#F1F5F9] text-[#657182]">
                        {msgs.some((m: any) => m.senderUserId === user?.id)
                          ? "Answered"
                          : "Pending"}
                      </span>
                      <span className="px-2 py-1 rounded bg-[#F1F5F9] text-[#657182]">
                        Medium
                      </span>
                    </div>
                  </div>

                  {/* Tüm mesajlar */}
                  <div className="space-y-2">
                    {sorted.map((msg: any) => (
                      <div
                        key={msg.id}
                        className={`p-3 rounded-lg border border-[#F0F2F5] ${
                          msg.senderUserId === user?.id
                            ? "bg-[#F0F2F5]"
                            : "bg-[#fff]"
                        }`}
                      >
                        <div className="text-sm font-medium text-[#1d2530]">
                          {msg.senderUserId === user?.id
                            ? "Siz"
                            : msg.senderFullName}
                        </div>
                        <div className="text-sm text-[#1d2530]">
                          {msg.content}
                        </div>
                        <div className="text-xs text-[#657182] mt-1">
                          {new Date(msg.sentAt).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Yanıt kutusu */}
                  <div className="border-t border-[#e0e5eb] pt-4">
                    {replyToUserId === Number(userId) ? (
                      <div className="space-y-2">
                        <textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="Yanıtınızı yazın..."
                          className="w-full border border-[#e0e5eb] rounded-lg p-2"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleSendReply(lastCustomerMessage.senderUserId)
                            }
                            className="bg-[#066FF9] text-white px-4 py-2 rounded-lg"
                          >
                            Gönder
                          </button>
                          <button
                            onClick={() => {
                              setReplyToUserId(null);
                              setReplyContent("");
                            }}
                            className="text-[#5C6673] hover:underline"
                          >
                            İptal
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="bg-[#066FF9] text-white px-4 py-2 rounded-lg"
                        onClick={() =>
                          setReplyToUserId(lastCustomerMessage.senderUserId)
                        }
                      >
                        Yanıtla
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ProtectedRoute>
    </Layout>
  );
};

export default page;
