// src/lib/api/messages.ts

export async function sendAdminMessage({
  receiverUserId,
  content,
}: {
  receiverUserId: number | null;
  content: string;
}) {
  const res = await fetch("/api/messages/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ receiverUserId, content }),
  });

  if (!res.ok) throw new Error("Mesaj gönderilemedi");
  return res.json();
}

export async function sendSupportMessage({ content }: { content: string }) {
  const res = await fetch("http://localhost:5270/api/messages/support", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // 🔥 Cookie gönderimi için şart
    body: JSON.stringify({ content }),
  });

  if (!res.ok) throw new Error("Destek mesajı gönderilemedi");
  return res.json();
}

export async function getInboxMessage(userId: number) {
  if (!userId || isNaN(userId)) throw new Error("Geçersiz kullanıcı ID");

  const res = await fetch(
    `http://localhost:5270/api/messages/inbox/${userId}`,
    {
      credentials: "include",
    }
  );
  if (!res.ok) throw new Error("Mesajlar alınamadı");

  return res.json();
}
