"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuthCheck() {
  const { data: session, status } = useSession();

  return {
    user: session?.user,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading"
  };
}

export function useProtectedRoute() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthCheck();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/signin");
    }
  }, [isAuthenticated, isLoading, router]);
}
