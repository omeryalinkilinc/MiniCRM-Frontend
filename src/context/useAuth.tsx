// src/context/useAuth.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "@/lib/api/settings";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function refreshUser() {
    try {
      const current = await getProfile();
      setUser(current.data);
      return current.data;
    } catch (err) {
      console.error("refreshUser error:", err);
      return null;
    } finally {
      setLoading(false);
    }
  }

  // ✅ İlk mount’ta profili çek
  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, refreshUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
