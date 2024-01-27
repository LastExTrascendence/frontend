"use client";

import { jwtDecode } from "jwt-decode";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { myState } from "@/recoil/atom";
import { IToken } from "@/app/register/page";
import { getCookie } from "@/api/cookie/cookies";

export default function useTokenValidator({
  setIsClient,
}: {
  setIsClient: any;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [myInfo, setMyInfo] = useRecoilState(myState);

  useEffect(() => {
    const token = getCookie("access_token");
    setIsClient(true);

    if (token) {
      try {
        const decodedToken: IToken = jwtDecode(token);
        const isExpired = decodedToken.exp * 1000 < Date.now();
        if (isExpired) {
          throw new Error("Token expired");
        }

        if (myInfo.id === 0) {
          setMyInfo((prevInfo) => ({
            ...prevInfo,
            id: decodedToken.id,
            nickname: decodedToken.nickname,
            language: decodedToken.language,
          }));
        }
      } catch (error) {
        // 토큰 검증 실패
        console.error("Token validation failed:", error);
        router.push("/login");
      }
    } else if (
      pathname !== "/login" &&
      pathname !== "/login/otp" &&
      pathname !== "/register"
    ) {
      router.push("/login");
    }
  }, [pathname, router]);
}
