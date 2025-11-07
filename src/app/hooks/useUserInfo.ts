"use client";
import { useEffect, useState } from "react";

export type AuthUser = {
  id: number;
  fullName: string;
  role: string;
};

export function useUserInfo(): AuthUser | null {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    fetch("http://localhost:5270/api/auth/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser({
            id: parseInt(data.user.id, 10),
            fullName: data.user.fullname,
            role: data.user.role,
          });
        }
      })
      .catch(() => setUser(null));
  }, []);

  return user;
}
