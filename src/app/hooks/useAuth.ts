import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Veritabanından gelen roller büyük harfle olabilir, normalize ediyoruz
export type Role = "admin" | "customer";

export function useAuth() {
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const normalizeRole = (rawRole: string | undefined): Role | null => {
    const r = rawRole?.toLowerCase();
    if (r === "admin" || r === "customer") return r;
    return null;
  };

  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:5270/api/auth/me", {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Access token expired");

      const data = await res.json();
      const normalized = normalizeRole(data.user?.role);
      if (normalized) {
        setRole(normalized);
      } else {
        console.warn("Bilinmeyen rol:", data.user?.role);
      }
    } catch {
      try {
        const refreshRes = await fetch(
          "http://localhost:5270/api/auth/refresh",
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (!refreshRes.ok) throw new Error("Refresh failed");

        const data = await refreshRes.json();
        const normalized = normalizeRole(data.role);
        if (normalized) {
          setRole(normalized);
        } else {
          console.warn("Bilinmeyen rol (refresh sonrası):", data.role);
        }
      } catch {
        await fetch("http://localhost:5270/api/auth/logout", {
          method: "POST",
          credentials: "include",
        });
        setRole(null);
        router.replace("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { role, loading };
}
