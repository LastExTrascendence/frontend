"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Card from "@/ui/card";
import PillButton from "@/ui/pill-button";
import { UserRegisterDataDto } from "@/types/dto/user.dto";
import { axiosCreateUser } from "@/api/axios/axios.custom";
import { getCookie } from "@/api/cookie/cookies";
import ProfileImage from "@/ui/profile-image";

const token = getCookie("access_token");

export enum UserRegisterCard {
  Nickname = "Nickname",
  Avatar = "Avatar",
  Welcome = "Welcome",
}

export enum UserRegisterCardTitle {
  Nickname = "닉네임을 입력해주세요",
  Avatar = "아바타를 선택해주세요",
  Welcome = "Welcome!",
}

export const useRegistrationSteps = () => {
  const [currentStep, setCurrentStep] = useState<UserRegisterCard>(
    UserRegisterCard.Nickname,
  );

  const steps = Object.values(UserRegisterCard);

  const nextStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    const nextIndex =
      currentIndex + 1 < steps.length ? currentIndex + 1 : currentIndex;
    setCurrentStep(steps[nextIndex] as UserRegisterCard);
  };

  const prevStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    const prevIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : currentIndex;
    setCurrentStep(steps[prevIndex] as UserRegisterCard);
  };

  return { currentStep, nextStep, prevStep };
};

export interface UserRegisterCardProps {
  setUserRegisterData: React.Dispatch<
    React.SetStateAction<UserRegisterDataDto>
  >;
  setUserRegisterStep: React.Dispatch<React.SetStateAction<UserRegisterCard>>;
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
  const { currentStep, nextStep, prevStep } = useRegistrationSteps();

  const UserRegisterFinished = async () => {
    const data = {
      nickname,
      // avatar: base64Image?.url,
      avatar: avatar,
      // bio,
    };
    const res = axiosCreateUser(data);
    console.log("resonse: ", res);
    console.log("data: ", data);
    setTimeout(() => {
      window.location.href = "/";
    }, 5000);
  };

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    } else {
    }
    // if (avatar) {
    //   encodeFileToBase64(avatar).then((base64Image) => {
    //     setBase64Image({ image: avatar, url: base64Image });
    //   });
    // }
  }, [avatar, nickname]);

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
      <RegisterCardsWrapperStyled>
        {currentStep === UserRegisterCard.Nickname && (
          <Card title={UserRegisterCardTitle[currentStep]}>
            <>
              <ProfileImage />
              <InputContainer $isValid={isValid}>
                <input
                  type="text"
                  placeholder="..."
                  value={nickname}
                  minLength={3}
                  maxLength={16}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (nickname.length < 3 || nickname.length > 16) {
                        setIsValid(false);
                      } else {
                        setIsValid(true);
                        nextStep();
                        console.log(currentStep);
                      }
                    }
                  }}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </InputContainer>
              <PillButton
                text="확인"
                width="260px"
                fontWeight="400"
                theme="purple"
                onClick={nextStep}
              />
            </>
          </Card>
        )}
        {currentStep === UserRegisterCard.Avatar && (
          <Card title="아바타를 선택해주세요">
            <>
              <ProfileImage />
              <PillButton
                text="돌아가기"
                width="260px"
                fontWeight="400"
                theme="white"
                onClick={prevStep}
              />
              <PillButton
                text="확인"
                width="260px"
                fontWeight="400"
                theme="purple"
                onClick={() => {
                  nextStep();
                  UserRegisterFinished();
                }}
              />
            </>
          </Card>
        )}
        {currentStep === UserRegisterCard.Welcome && <h1>Welcome!</h1>}
      </RegisterCardsWrapperStyled>
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
  margin-left: 25px;
`;

const InputContainer = styled.div<{ $isValid: boolean }>`
  display: flex;
  align-items: center;

  input {
    width: 300px;
    height: 60px;
    outline: none;
    border: 3px solid var(--main-purple);
    color: var(--main-purple);
    animation: ${(props) => (props.$isValid ? "none" : "shake 0.5s")};
    font-size: 1.75rem;
    padding: 0 1rem;
    border-radius: 20px;
  }
  input::placeholder {
    color: var(--main-purple);
    font-style: italic;
    font-size: 1rem;
  }
`;

const RegisterCardsWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
