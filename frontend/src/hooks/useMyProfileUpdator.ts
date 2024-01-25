import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { myState } from "@/recoil/atom";
import { getCookie } from "@/api/cookie/cookies";
import { axiosMyProfileInfo } from "@/api/axios/axios.custom";

export default function useMyProfileUpdator() {
  const [myInfo, setMyInfo] = useRecoilState(myState);

  useEffect(() => {
    const token = getCookie("access_token");
    if (!token) return;

    const loadMyInfo = async () => {
      if (myInfo.id === 0) {
        const { data: userProfileInfo } = await axiosMyProfileInfo();
        setMyInfo(userProfileInfo);
      }
    };
    loadMyInfo();
  }, [myInfo.id]);

}
