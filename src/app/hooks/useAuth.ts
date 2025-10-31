import { useEffect, useState } from "react";

type Role = "admin" | "customer";

export function useAuth() {
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5270/api/auth/me", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Oturum geçersiz");
        return res.json();
      })
      .then((data) => {
        const r = data.user?.role?.toLowerCase();
        if (r === "admin" || r === "customer") {
          setRole(r);
        } else {
          console.warn("Bilinmeyen rol:", r);
        }
      })
      .catch((err) => {
        console.error("Auth hatası:", err);
        setRole(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return { role, loading };
}
