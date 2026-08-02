"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";

export default function withAuth(Component, options = {}) {
  const { redirectTo = "/login", fallback } = options;

  function WithAuth(props) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user && fallback === undefined) {
        router.push(redirectTo);
      }
    }, [loading, user, router]);

    if (loading) return null;
    if (!user) {
      return fallback !== undefined ? fallback : null;
    }

    return <Component {...props} />;
  }

  WithAuth.displayName = `withAuth(${Component.displayName || Component.name || "Component"})`;
  return WithAuth;
}
