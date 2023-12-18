"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Card from "@/ui/card";
import PillButton from "@/ui/pill-button";
import { RegistrationDataDto } from "@/types/dto/user.dto";
import { axiosCreateUser } from "@/api/axios/axios.custom";
import { getCookie } from "@/api/cookie/cookies";

const token = getCookie("access_token");

export enum RegistrationCard {
  Nickname = "NicknameCard",
  Avatar = "AvatarCard",
  Bio = "BioCard",
  Welcome = "WelcomeCard",
}

export type RegistrationCardType =
  | RegistrationCard.Nickname
  | RegistrationCard.Avatar
  | RegistrationCard.Bio
  | RegistrationCard.Welcome;

export interface RegistrationCardProps {
  setRegistrationData: React.Dispatch<
    React.SetStateAction<RegistrationDataDto>
  >;
  setRegistrationStep: React.Dispatch<React.SetStateAction<RegistrationCard>>;
}

const encodeFileToBase64 = (image: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (event: any) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
  });
};

export default function Page() {
  const [isValid, setIsValid] = useState<boolean>(true);
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState("");
  const [base64Image, setBase64Image] = useState<{ image: File; url: any }>();
  const [bio, setBio] = useState("");
  const [cardStatus, setCardStatus] = useState<RegistrationCardType>(
    RegistrationCard.Nickname,
  );

  const registrationFinished = async () => {
    const data = {
      nickname,
      // avatar: base64Image?.url,
      avatar: avatar,
      bio,
    };
    const res = axiosCreateUser(data);
    console.log("resonse: ", res);
    console.log("data: ", data);
    // setTimeout(() => {
    //   window.location.href = "/";
    // }, 3000);
  };

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
    } else {
    }
    // if (avatar) {
    //   encodeFileToBase64(avatar).then((base64Image) => {
    //     setBase64Image({ image: avatar, url: base64Image });
    //   });
    // }
    console.log(nickname, avatar, bio);
  }, [avatar, nickname, bio]);

  return (
    <RegisterPageStyled>
      <RegisterTitleWrapperStyled>
        <Image
          src="/LET_logo.svg"
          alt="LET Logo"
          width={100}
          height={100}
          priority
        />
        <RegisterTitleStyled>L.E.T</RegisterTitleStyled>
      </RegisterTitleWrapperStyled>
      <RegisterCardsStyled>
        {/* {cardStatus === RegistrationCard.Nickname && ( */}
        <Card title="닉네임을 입력해주세요">
          <>
            <InputContainer $isValid={isValid}>
              <input
                type="text"
                placeholder="test"
                value={nickname}
                minLength={3}
                maxLength={16}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (nickname.length < 3 || nickname.length > 16) {
                      setIsValid(false);
                    } else {
                      setIsValid(true);
                      setCardStatus(RegistrationCard.Avatar);
                    }
                  }
                }}
                onChange={(e) => setNickname(e.target.value)}
              />
            </InputContainer>
          </>
        </Card>
        {/* )} */}
        {/* {cardStatus === RegistrationCard.Avatar && ( */}
        <Card title="아바타를 선택해주세요">
          <></>
        </Card>
        {/* )} */}
        {/* {cardStatus === RegistrationCard.Bio && ( */}
        <Card title="자기소개를 입력해주세요">
          <>
            <PillButton
              text="확인"
              fontWeight="200"
              theme="purple"
              onClick={registrationFinished}
            />
          </>
        </Card>
        {/* )} */}
        {cardStatus === RegistrationCard.Welcome && <h1>Welcome!</h1>}
      </RegisterCardsStyled>
    </RegisterPageStyled>
  );
}

const RegisterPageStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
  flex-direction: column;
`;

const RegisterTitleWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: 60px;
`;

const RegisterTitleStyled = styled.div`
  font-size: 6rem;
  font-style: italic;
  font-weight: 800;
  line-height: normal;
  color: var(--white);
`;

const InputContainer = styled.div<{ $isValid: boolean }>`
  display: flex;
  align-items: center;

  input {
    width: 250px;
    height: 40px;
    outline: none;
    border: 2px solid var(--main-purple);
    color: var(--main-purple);
    animation: ${(props) => (props.$isValid ? "none" : "shake 0.5s")};
    font-size: 2rem;
    padding: 0 1rem;
  }
  input::placeholder {
    color: var(--main-purple);
    font-size: 2rem;
  }
`;

const RegisterCardsStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
