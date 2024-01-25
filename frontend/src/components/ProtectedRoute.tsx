"use client";

import { useState } from "react";
import useTokenValidator from "@/hooks/useTokenValidator";
import useMyProfileUpdator from "@/hooks/useMyProfileUpdator";

export default function ProtectedRoute({ children }: { children: any }) {
  const [isClient, setIsClient] = useState(false);

  useTokenValidator({ setIsClient });
  useMyProfileUpdator();

  if (!isClient) {
    return <div />;
  }

  return children;
}
