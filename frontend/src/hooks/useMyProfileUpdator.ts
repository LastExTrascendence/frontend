"use client"

import i18n from "i18next";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { myState } from "@/recoil/atom";
import { getCookie } from "@/api/cookie/cookies";
import { axiosMyProfileInfo } from "@/api/axios/axios.custom";

export enum LanguageType {
  EN = "en",
  KO = "ko",
  FR = "fr",
}

export default function useMyProfileUpdator() {
  const [myInfo, setMyInfo] = useRecoilState(myState);
  const pathname = usePathname();
  useEffect(() => {
    const token = getCookie("access_token");

    const handleLanguage = (selectedLang: LanguageType): void => {
      i18n.changeLanguage(selectedLang);
    };

    const loadMyInfo = async () => {
      if (myInfo.id === 0) {
        const { data: userProfileInfo } = await axiosMyProfileInfo();
        setMyInfo(userProfileInfo);
        handleLanguage(userProfileInfo.language as LanguageType ?? "en");
      }
    };

    if (!token && pathname !== "/login" && pathname !== "/login/otp" && pathname !== "/register") {
      loadMyInfo();
    }
  }, [myInfo.id]);

}
