import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { myState } from "@/recoil/atom";
import ProfileImage from "@/ui/profile-image";
import {
  UserNickNameStyled,
  UserNicknameWrapperStyled,
  UserStatusStyled,
} from "./friend-section-card";
import { useRouter } from "next/navigation";
import { getCookie } from "@/api/cookie/cookies";
import { axiosMyInfo } from "@/api/axios/axios.custom";

export default function FriendSectionMyStatus() {
  const router = useRouter();
  const [myInfo, setMyInfo] = useRecoilState(myState);
  const token = getCookie("access_token");

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    } else {
      getMyInfo();
    }
  }, []);

  const getMyInfo = async () => {
    try {
      const { data: userInfo } = await axiosMyInfo();
      setMyInfo(userInfo);
      console.log(userInfo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MyStatusContainerStyled>
      <MyStatusWrapperStyled>
        <ProfileImage
          src={myInfo.avatar || "/default_profile.svg"}
          width={50}
          height={50}
          showOutline={true}
        />
        <UserStatusStyled $status={myInfo.status}></UserStatusStyled>
        <UserNicknameWrapperStyled $width={50}>
          <UserNickNameStyled>{myInfo.nickname}</UserNickNameStyled>
        </UserNicknameWrapperStyled>
      </MyStatusWrapperStyled>
    </MyStatusContainerStyled>
  );
}

const MyStatusContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80px;
  min-height: 80px;
  background-color: var(--background-dark-gray);
  align-items: center;
  justify-content: center;
  position: relative;
`;

const MyStatusWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 1.5rem;
`;
