"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { defaultUserInfo } from "@/app/(overview)/(dm)/dm/[nickname]/page";
import MultiToggleSwitch, { toggleItem } from "@/ui/multi-toggle-switch";
import Record from "@/ui/overview/profile/record";
import Stats from "@/ui/overview/profile/stats";
import UserInfoCard from "@/ui/user-info-card";
import { STATUS_400_BAD_REQUEST } from "@/types/constants/status-code";
import {
  GameRecordListDto,
  GameRecordListResponseDto,
} from "@/types/interface/game.interface";
import { UserCardInfoDto } from "@/types/interface/user.interface";
import {
  axiosGetUserGameRecord,
  axiosGetUserProfileByNickname,
} from "@/api/axios/axios.custom";

export enum ProfileViewType {
  RECORD = "RECORD",
  STATS = "STATS",
}

const toggleList: toggleItem[] = [
  { name: "Record", key: ProfileViewType.RECORD },
  { name: "Stats", key: ProfileViewType.STATS },
];

export default function Page({ params }: { params: { nickname: string } }) {
  const [profileView, setProfileView] = useState<ProfileViewType>(
    ProfileViewType.RECORD,
  );
  const [userInfo, setUserInfo] = useState<UserCardInfoDto>(defaultUserInfo);
  const [gameRecordList, setGameRecordList] =
    useState<GameRecordListResponseDto>(undefined);

  useEffect(() => {
    getUserProfileInfo();
    getGameRecord();
  }, []);

  const getUserProfileInfo = async () => {
    try {
      const { data: userProfileInfo } = await axiosGetUserProfileByNickname(
        params.nickname,
      );
      setUserInfo(userProfileInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const getGameRecord = async () => {
    try {
      const response = await axiosGetUserGameRecord(params.nickname)
        .then((res) => {
          setTimeout(() => {
            setGameRecordList(res.data);
          }, 500);
        })
        .catch((err) => {
          setTimeout(() => {
            setGameRecordList(STATUS_400_BAD_REQUEST);
          }, 500);
        });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <>
      <UserConfigAreaStyled>
        <ToggleSwitchWrapperStyled>
          <MultiToggleSwitch
            toggleList={toggleList}
            initialState={profileView}
            setState={setProfileView}
            width="130px"
          />
        </ToggleSwitchWrapperStyled>
        {profileView === ProfileViewType.RECORD ? (
          <Record games={gameRecordList} />
        ) : (
          <Stats />
        )}
      </UserConfigAreaStyled>
      <UserInfoCard userInfo={userInfo} />
    </>
  );
}

const UserConfigAreaStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100% - 300px);
  height: 100%;
  border-radius: 20px;
  color: var(--white);

  @media (max-width: 610px) {
    width: 100%;
  }
`;

const ToggleSwitchWrapperStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 50px;
  margin: 1rem 0;
  padding-left: 1.5rem;
  border-radius: 10px;
`;
