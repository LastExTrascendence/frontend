"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { myState } from "@/recoil/atom";
import InputContainer from "@/ui/input-container";
import MultiToggleSwitch, { toggleItem } from "@/ui/multi-toggle-switch";
import PillButton from "@/ui/pill-button";
import UserInfoCard from "@/ui/user-info-card";
import {
  UserCardInfoDto,
  UserCardInfoResponseDto,
} from "@/types/interface/user.interface";
import { axiosMyProfileInfo } from "@/api/axios/axios.custom";

export enum TwoFAType {
  ON = "ON",
  OFF = "OFF",
}

const toggleList: toggleItem[] = [
  { name: "On", key: TwoFAType.ON },
  { name: "Off", key: TwoFAType.OFF },
];

export default function Page() {
  const [twoFA, setTwoFA] = useState<TwoFAType>(TwoFAType.OFF);
  const [nickname, setNickname] = useState<string>("");
  const [avatar, setAvatar] = useState<Blob>();
  const [myInfo, setMyInfo] = useRecoilState(myState);
  const [userInfo, setUserInfo] = useState<UserCardInfoResponseDto>(undefined);

  // 상태 업데이트
  const updateMyInfo = (newNickname: any, newAvatar: any) => {
    setMyInfo((prevInfo) => ({
      ...prevInfo,
      nickname: newNickname,
      avatar: newAvatar,
    }));
  };

  useEffect(() => {
    getMyProfileInfo();
  }, []);

  const getMyProfileInfo = async () => {
    try {
      const { data: userProfileInfo } = await axiosMyProfileInfo();

      setTimeout(() => {
        setUserInfo(userProfileInfo);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
                setNickname(myInfo.nickname);
                setAvatar(undefined);
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
                updateMyInfo(nickname, avatar);
              }}
            />
          </ButtonWrapperStyled>
        </ButtonGroupStyled>
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
