"use client";
import styled from "styled-components";
import UserInfoCard from "@/ui/user-info-card";
import InputContainer from "@/ui/input-container";
import { ChangeEvent, useEffect, useState } from "react";
import PillButton from "@/ui/pill-button";
import MultiToggleSwitch from "@/ui/multi-toggle-switch";
import { useRecoilState } from "recoil";
import { myState } from "@/recoil/atom";
import { UserProfileInfoDto } from "@/types/interface/user.interface";
import { axiosMyProfileInfo } from "@/api/axios/axios.custom";
import { UserStatus } from "@/types/enum/user.enum";

export enum TwoFAType {
  ON = "ON",
  OFF = "OFF",
}

const toggleList = [
  { name: "On", key: TwoFAType.ON },
  { name: "Off", key: TwoFAType.OFF },
];

export default function Page() {
  const [twoFA, setTwoFA] = useState<TwoFAType>(TwoFAType.OFF);
  const [nickname, setNickname] = useState<string>("");
  const [avatar, setAvatar] = useState<Blob>();

  const [userInfo, setUserInfo] = useState<UserProfileInfoDto>({
    id: 0,
    nickname: "",
    intra_name: "",
    email: "",
    status: UserStatus.OFFLINE,
    is_friend: false,
    at_friend: new Date(),
    avatar: "",
    games: 0,
    wins: 0,
    loses: 0,
  });

  useEffect(() => {
    getMyProfileInfo();
  }, [userInfo]);

  const getMyProfileInfo = async () => {
    try {
      const { data: userProfileInfo } = await axiosMyProfileInfo();
      setUserInfo(userProfileInfo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserProfilePageStyled>
      <UserProfileContainerStyled>
        <UserConfigAreaStyled>
          <PropertyContainerWrapperStyled>
            <PropertyTitleStyled width={"300px"}>Nickname</PropertyTitleStyled>
            <InputContainer
              placeholder="Nickname"
              width={"300px"}
              height={"50px"}
              borderRadius={"10px"}
              value={nickname}
              onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                setNickname(e.target.value);
              }}
            />
          </PropertyContainerWrapperStyled>
          <PropertyContainerWrapperStyled>
            <PropertyTitleStyled width={"300px"}>Avatar</PropertyTitleStyled>
            <ButtonContainerStyled>
              <PillButton
                width={"140px"}
                height={"30px"}
                theme={"purple"}
                fontSize="1rem"
                text="Change Avatar"
                onClick={() => {
                  console.log("click");
                }}
              />
              <PillButton
                width={"140px"}
                height={"30px"}
                theme={"gray"}
                fontSize="1rem"
                text="Remove Avatar"
                onClick={() => {
                  console.log("click");
                }}
              />
            </ButtonContainerStyled>
          </PropertyContainerWrapperStyled>
          <TwoFAWrapperStyled>
            <PropertyTitleStyled width={"300px"}>
              2-Factor Authentication
            </PropertyTitleStyled>
            <ToggleSwitchWrapperStyled>
              <MultiToggleSwitch
                toggleList={toggleList}
                initialState={twoFA}
                setState={setTwoFA}
              />
            </ToggleSwitchWrapperStyled>
          </TwoFAWrapperStyled>
          <ButtonGroupStyled>
            <ButtonWrapperStyled>
              <PillButton
                width={"100px"}
                height={"30px"}
                theme={"lightgray"}
                fontSize="1rem"
                text="Reset"
                onClick={() => {
                  console.log("click");
                }}
              />
            </ButtonWrapperStyled>
            <ButtonWrapperStyled>
              <PillButton
                width={"100px"}
                height={"30px"}
                theme={"purple"}
                fontSize="1rem"
                text="Save"
                onClick={() => {
                  console.log("click");
                }}
              />
            </ButtonWrapperStyled>
          </ButtonGroupStyled>
        </UserConfigAreaStyled>
        <UserInfoCard
          id={userInfo.id}
          nickname={userInfo.nickname}
          intra_name={userInfo.intra_name}
          email={userInfo.email}
          status={userInfo.status}
          is_friend={userInfo.is_friend}
          at_friend={userInfo.at_friend}
          avatar={userInfo.avatar}
          games={userInfo.games}
          wins={userInfo.wins}
          loses={userInfo.loses}
        />
      </UserProfileContainerStyled>
    </UserProfilePageStyled>
  );
}

const UserProfilePageStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const UserProfileContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 50px);
  height: calc(100% - 50px);
  border-radius: 20px;
  background-color: var(--gray);
`;

const UserConfigAreaStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100% - 300px);
  height: 100%;
  border-radius: 20px;
  color: var(--white);
`;

const PropertyContainerWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
  margin: 1rem 0 1rem 0;

  &::after {
    content: "";
    display: block;
    position: relative;
    width: 290px;
    height: 1px;
    top: 1rem;
    background-color: var(--line-color-light-gray);
    /* opacity: 0.5; */
  }
`;

const PropertyTitleStyled = styled.div<{ width: string }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--white);
  width: ${(props) => props.width};
  padding-left: 0.5rem;
`;

const ButtonContainerStyled = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
  align-items: center;
  width: 300px;
  height: 50px;
  margin: 1rem 0;
`;

const TwoFAWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
  margin: 1rem 0 1rem 0;
`;

const ToggleSwitchWrapperStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
  height: 50px;
  margin: 1rem 0;
  border-radius: 10px;
  /* background-color: var(--input-container-color); */
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 320px;
  height: 50px;
  margin: 1rem 0;
`;

const ButtonWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.5rem;
`;
