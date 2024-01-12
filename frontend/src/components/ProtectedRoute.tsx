"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { getCookie } from "@/api/cookie/cookies";

export default function ProtectedRoute({ children }) {
  const token = getCookie("access_token");
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (!token && pathname !== "/login") {
      router.replace("/login");
    }
  }, [token, pathname, router]);

  if (isClient) {
    return children;
  }

  return <div />;
}
