export async function getCurrentUser() {
  const res = await fetch("http://localhost:5270/api/auth/me", {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Kullanıcı bilgisi alınamadı");
  }

  const data = await res.json();

  return {
    fullName: data.user.fullName,
    email: data.user.email,
    company: data.user.company,
    customerType: data.user.customerType,
  };
}
