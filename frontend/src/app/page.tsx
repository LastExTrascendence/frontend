"use client";
import styled from "styled-components";
import Image from "next/image";
import MainButtonList from "@/ui/mainpage/main-buttons";
import LogoutIcon from "@/ui/icon/logout-icon";
import InfoIcon from "@/ui/icon/info-icon";
import { getCookie } from "@/api/cookie/cookies";
import { useSetRecoilState } from "recoil";
import { myState } from "@/recoil/atom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { axiosMyInfo } from "@/api/axios/axios.custom";

export default function Home() {
  const router = useRouter();
  const setMyInfo = useSetRecoilState(myState);
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
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <MainPageStyled>
      <TopNavStyled>
        <InfoIcon />
        <LogoutIcon />
      </TopNavStyled>
      <MainLogoContainerStyled>
        <MainLogoTitleStyled>L.E.T</MainLogoTitleStyled>
        <Image src="/LET_logo_white.svg" alt="Logo" width={120} height={120} />
      </MainLogoContainerStyled>
      <ButtonGroupContainerStyled>
        <MainButtonList />
      </ButtonGroupContainerStyled>
    </MainPageStyled>
  );
}

const MainPageStyled = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 6rem;
`;

const TopNavStyled = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 0 2rem;
`;

const MainLogoContainerStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainLogoTitleStyled = styled.div`
  color: var(--white);
  font-style: italic;
  font-weight: 800;
  font-size: 6rem;
  margin-right: 2rem;
`;

const ButtonGroupContainerStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
