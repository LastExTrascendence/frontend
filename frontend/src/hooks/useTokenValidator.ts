import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookie } from "@/api/cookie/cookies";

export default function useTokenValidator({ setIsClient }: { setIsClient: any }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("access_token");
    setIsClient(true);

    if (!token && pathname !== "/login" && pathname !== "/login/otp" && pathname !== "/register") {
      router.push("/login");
    }
  }, [pathname, router]);

}