"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ChatChannelContainerStyled } from "@/app/(main)/(overview)/(channel)/channel/page";
import {
  ProfileContainerStyled,
  ProfilePageStyled,
} from "@/app/(main)/(overview)/(profile)/profile/page";
import {
  FailResponseModal,
  SuccessResponseModal,
} from "@/components/Modals/ResponseModal/ResponseModal";
import MultiToggleSwitch, { toggleItem } from "@/ui/multi-toggle-switch";
import Record from "@/ui/overview/profile/record";
import Stats from "@/ui/overview/profile/stats";
import UserInfoCard, { UserInfoButtonStyled } from "@/ui/user-info-card";
import { STATUS_400_BAD_REQUEST } from "@/types/constants/status-code";
import {
  GameRecordListResponseDto,
  GameStatsResponseDto,
} from "@/types/interface/game.interface";
import {
  UserCardInfoDto,
  UserCardInfoResponseDto,
} from "@/types/interface/user.interface";
import {
  axiosAddFriend,
  axiosGetUserGameRecord,
  axiosGetUserGameStats,
  axiosGetUserProfileByNickname,
  axiosRemoveFriend,
} from "@/api/axios/axios.custom";
import { useMenu } from "@/hooks/useMenu";

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
  const [userInfo, setUserInfo] = useState<UserCardInfoResponseDto>(undefined);
  const [gameRecordList, setGameRecordList] =
    useState<GameRecordListResponseDto>(undefined);
  const [gameStats, setGameStats] = useState<GameStatsResponseDto>(undefined);
  const [updateUserInfo, setUpdateUserInfo] = useState<boolean>(true);
  const { openUserInfoCard } = useMenu();

  useEffect(() => {
    getGameRecord();
    getGameStats();
  }, []);

  useEffect(() => {
    if (updateUserInfo) {
      getUserProfileInfo();
      setUpdateUserInfo(false);
    }
  }, [updateUserInfo]);

  const getUserProfileInfo = async () => {
    try {
      const { data: userProfileInfo } = await axiosGetUserProfileByNickname(
        params.nickname,
      );
      setTimeout(() => {
        setUserInfo(userProfileInfo);
      }, 500);
    } catch (error) {
      // console.log(error);
    }
  };

  const getGameRecord = async () => {
    try {
      const response = await axiosGetUserGameRecord(params.nickname);
      setTimeout(() => {
        setGameRecordList(response.data);
      }, 500);
    } catch (error) {
      console.log("error", error);
      // console.log(error);
      setGameRecordList(STATUS_400_BAD_REQUEST);
      throw error;
    }
  };

  const getGameStats = async () => {
    try {
      const response = await axiosGetUserGameStats(params.nickname)
        .then((res) => {
          setTimeout(() => {
            setGameStats(res.data);
          }, 500);
        })
        .catch((err) => {
          setTimeout(() => {
            setGameStats(STATUS_400_BAD_REQUEST);
          }, 500);
        });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <>
      <ProfilePageStyled>
        <ProfileContainerStyled>
          <UserConfigAreaStyled>
            <div className="w-full h-full flex flex-col content-start items-center">
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
              <ToggleSwitchWrapperStyled>
                <MultiToggleSwitch
                  toggleList={toggleList}
                  initialState={profileView}
                  setState={setProfileView}
                  width="130px"
                />
              </ToggleSwitchWrapperStyled>
              <InfoContainerStyled>
                {profileView === ProfileViewType.RECORD ? (
                  <Record games={gameRecordList} />
                ) : (
                  <Stats stats={gameStats} />
                )}
              </InfoContainerStyled>
            </div>
          </UserConfigAreaStyled>
          <UserInfoCard
            userInfo={userInfo}
            updateUserInfo={setUpdateUserInfo}
          />
        </ProfileContainerStyled>
      </ProfilePageStyled>
    </>
  );
}

const UserConfigAreaStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 20px;

  @media (max-width: 610px) {
    border-radius: 0;
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

const InfoContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: calc(100%);
  height: calc(100%);
  overflow-y: scroll;
`;
