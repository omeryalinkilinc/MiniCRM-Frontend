export async function getInboxWithUser(adminId: number) {
  const response = await fetch(
    `http://localhost:5270/api/messages/inbox-with-user/${adminId}`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) throw new Error("Mesajlar alınamadı");
  return await response.json();
}
