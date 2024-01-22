"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DMChat from "@/ui/overview/dm/dm-chat";
import UserInfoCard, { UserInfoButtonStyled } from "@/ui/user-info-card";
import { UserCardInfoResponseDto } from "@/types/interface/user.interface";
import { axiosGetUserProfileByNickname } from "@/api/axios/axios.custom";
import { useMenu } from "@/hooks/useMenu";

const DMPageContainerStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const DMPageContentWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100%);
  height: calc(100%);
  background-color: var(--gray);
  border-radius: 20px;

  @media (max-width: 610px) {
    width: calc(100%);
    height: calc(100%);
    margin: 0;
    border-radius: 0;
    justify-content: flex-end;
  }
`;

export const DMAreaStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  padding: 1rem;

  @media (max-width: 610px) {
    border-radius: 0;
  }
`;

export default function DM({ params }: { params: { nickname: string } }) {
  const [userInfo, setUserInfo] = useState<UserCardInfoResponseDto>(undefined);
  const { openUserInfoCard } = useMenu();
  const [updateUserInfo, setUpdateUserInfo] = useState<boolean>(true);

  const getUserProfileInfo = async () => {
    try {
      const { data: userProfileInfo } = await axiosGetUserProfileByNickname(
        params.nickname,
      );
      setTimeout(() => {
        setUserInfo(userProfileInfo);
      }, 300);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (updateUserInfo) {
      getUserProfileInfo();
      setUpdateUserInfo(false);
    }
  }, [updateUserInfo]);

  return (
    <DMPageContainerStyled>
      <DMPageContentWrapperStyled>
        <DMAreaStyled className="bg-chatColor">
          <UserInfoButtonStyled
            onClick={() => {
              openUserInfoCard();
            }}
          >
            <Image
              src="/arrow_left.svg"
              alt="UserInfoToggler"
              width={30}
              height={30}
            />
          </UserInfoButtonStyled>
          <DMChat nickname={params.nickname} />
        </DMAreaStyled>
        <UserInfoCard userInfo={userInfo} updateUserInfo={setUpdateUserInfo} />
      </DMPageContentWrapperStyled>
    </DMPageContainerStyled>
  );
}

export const UserInfoCardWrapperStyled = styled.div``;
