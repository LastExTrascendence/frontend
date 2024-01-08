"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getCookie } from "@/api/cookie/cookies";

export default function ProtectedRoute({ children }: { children: any }) {
  const token = getCookie("access_token");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/login" && !token) {
      router.replace("/login");
    }
  }, [router, token]);

  if (!token && pathname !== "/login") {
    return <div></div>;
  }

  return children;
}
