"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowed: string[];
  onAuthorized?: () => void; // dışarıdan yetki onayı sonrası tetiklenecek callback
};

const ProtectedRoute = ({
  children,
  allowed,
  onAuthorized,
}: ProtectedRouteProps) => {
  const { role, loading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      const normalizedRole = (role ?? "").toLowerCase().trim();
      const authorized = allowed.includes(normalizedRole);

      if (!authorized) {
        router.replace("/unauthorized");
      } else {
        setIsAuthorized(true);
        onAuthorized?.(); // yetki onaylandıysa callback tetiklenir
      }
    }
  }, [loading, role, allowed, router, onAuthorized]);

  if (loading || !isAuthorized) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
