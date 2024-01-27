"use client"

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { myState } from "@/recoil/atom";
import { getCookie } from "@/api/cookie/cookies";
import { axiosMyProfileInfo } from "@/api/axios/axios.custom";

export default function useMyProfileUpdator() {
  const [myInfo, setMyInfo] = useRecoilState(myState);
  const pathname = usePathname();
  useEffect(() => {
    const token = getCookie("access_token");

    const loadMyInfo = async () => {
      if (myInfo.id === 0) {
        const { data: userProfileInfo } = await axiosMyProfileInfo();
        setMyInfo(userProfileInfo);
      }
    };

    if (!token && pathname !== "/login" && pathname !== "/login/otp" && pathname !== "/register") {
      loadMyInfo();
    }
  }, [myInfo.id]);

}
