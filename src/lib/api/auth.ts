// src/lib/api/auth.ts

export type CurrentUser = {
  fullName: string;
  email: string;
  company: string | null;
  customerType: string | null;
};

const BASE_URL = "http://localhost:5270";

export async function getCurrentUser(): Promise<CurrentUser> {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/me`, {
      method: "GET",
      credentials: "include", // cookie/tabanlı oturum için gerekli
      headers: {
        Accept: "application/json",
      },
      cache: "no-store", // Next.js ortamında cache sorunlarını önlemek için
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(
        `Kullanıcı bilgisi alınamadı (${res.status}): ${
          text || "Bilinmeyen hata"
        }`
      );
    }

    const data = await res.json();

    // Null/undefined güvenliği ve alan eşlemesi
    const user = data?.user ?? {};
    return {
      fullName: user.fullName ?? "",
      email: user.email ?? "",
      company: user.company ?? null,
      customerType: user.customerType ?? null,
    };
  } catch (err) {
    console.error("getCurrentUser error:", err);
    throw err instanceof Error
      ? err
      : new Error("Kullanıcı bilgisi alınırken beklenmeyen bir hata oluştu");
  }
}
