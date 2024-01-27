"use client";

import { useState } from "react";
import useMyProfileUpdator from "@/hooks/useMyProfileUpdator";
import useTokenValidator from "@/hooks/useTokenValidator";

export default function ProtectedRoute({ children }: { children: any }) {
  const [isClient, setIsClient] = useState(false);

  useTokenValidator({ setIsClient });
  useMyProfileUpdator();

  if (!isClient) {
    return <div />;
  }

  return children;
}
