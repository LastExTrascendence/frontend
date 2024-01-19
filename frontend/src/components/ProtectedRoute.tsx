"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookie } from "@/api/cookie/cookies";

export default function ProtectedRoute({ children }: { children: any }) {
  const token = getCookie("access_token");
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (!token && pathname !== "/login" && pathname !== "/login/otp") {
      router.replace("/login");
    }
  }, [token, pathname, router]);

  if (isClient) {
    return children;
  }

  return <div />;
}
