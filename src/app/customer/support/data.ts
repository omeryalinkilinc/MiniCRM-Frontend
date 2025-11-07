export async function getMessagesForUser(userId: number) {
  const response = await fetch(
    `http://localhost:5270/api/messages/inbox/${userId}`,
    {
      credentials: "include",
    }
  );
  if (!response.ok) throw new Error("Mesajlar alınamadı");
  return await response.json();
}
