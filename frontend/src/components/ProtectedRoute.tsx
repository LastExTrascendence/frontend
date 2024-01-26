"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import useMyProfileUpdator from "@/hooks/useMyProfileUpdator";
import useTokenValidator from "@/hooks/useTokenValidator";

export default function ProtectedRoute({ children }: { children: any }) {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  if (pathname !== "/login" && pathname !== "/login/otp") {
    useTokenValidator({ setIsClient });
    useMyProfileUpdator();

    if (!isClient) {
      return <div />;
    }
  }

  return children;
}
