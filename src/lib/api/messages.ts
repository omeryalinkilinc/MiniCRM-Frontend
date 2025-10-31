// src/lib/api/messages.ts

export async function sendAdminMessage({
  senderUserId,
  receiverUserId,
  content,
}: {
  senderUserId: number;
  receiverUserId: number | null;
  content: string;
}) {
  const res = await fetch("/api/messages/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ senderUserId, receiverUserId, content }),
  });

  if (!res.ok) throw new Error("Mesaj gönderilemedi");
  return res.json();
}

export async function getInboxMessage(userId: number) {
  const res = await fetch(`/api/messages/inbox/${userId}`);

  if (!res.ok) throw new Error("Mesajlar alınamadı");

  return res.json();
}

export async function sendSupportMessage({
  senderUserId,
  content,
}: {
  senderUserId: number;
  content: string;
}) {
  const res = await fetch("/api/messages/support", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ senderUserId, content }),
  });

  if (!res.ok) throw new Error("Destek mesajı gönderilemedi");

  return res.json();
}
