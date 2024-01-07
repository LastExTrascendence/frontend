"use client";
import { useRouter, usePathname } from "next/navigation";

import { useEffect } from "react";

import { getCookie } from "@/api/cookie/cookies";

export default function ProtectedRoute({ children }) {
  const token = getCookie("access_token");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/login" && !token) {
      router.replace("/login");
    }
  }, [pathname, router, token]);

  if (!token && pathname !== "/login") {
    return <div />;
  }

  return children;
}
