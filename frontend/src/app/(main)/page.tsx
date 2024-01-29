"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { useRecoilState } from "recoil";
import { myState } from "@/recoil/atom";

import InfoIcon from "@/ui/icon/info-icon";
import LogoutIcon from "@/ui/icon/logout-icon";
import MainButtonList from "@/ui/mainpage/main-buttons";
import { axiosMyInfo } from "@/api/axios/axios.custom";


const MainPageStyled = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 6rem;
  min-width: 400px;
  overflow-y: scroll;
  scrollbar-width: none;
  overflow-x: hidden;
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

  @media only screen and (max-width: 1000px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

export default function Home() {
  const { t } = useTranslation('common');
  const [myInfo, setMyInfo] = useRecoilState(myState);

  const getMyInfo = async () => {
    try {
      const { data: userInfo } = await axiosMyInfo();
      setMyInfo(userInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyInfo();
  }, []);

  return (
    <MainPageStyled>
      <TopNavStyled>
        <InfoIcon />
        <LogoutIcon />
      </TopNavStyled>
      <MainLogoContainerStyled>
        <MainLogoTitleStyled>{t('startPage')}</MainLogoTitleStyled>
        <Image src="/LET_logo_white.svg" alt="Logo" width={120} height={120} />
      </MainLogoContainerStyled>
      <ButtonGroupContainerStyled>
        <MainButtonList />
      </ButtonGroupContainerStyled>
    </MainPageStyled>
  );
}
