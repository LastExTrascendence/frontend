"use client";

import createConfetti from "canvas-confetti";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import { myState } from "@/recoil/atom";
import { convertBase64 } from "@/app/(main)/(overview)/(profile)/profile/page";
import {
  FailResponseModal,
  SuccessResponseModal,
} from "@/components/Modals/ResponseModal/ResponseModal";
import Card from "@/ui/card";
import PillButton from "@/ui/pill-button";
import ProfileImage from "@/ui/profile-image";
import { UserRegisterDataDto } from "@/types/dto/user.dto";
import { UserStatus } from "@/types/enum/user.enum";
import { axiosCreateUser } from "@/api/axios/axios.custom";
import { getCookie } from "@/api/cookie/cookies";

export interface IToken {
  id: number;
  nickname: string;
  avatar: string;
  email: string;
  two_fa: boolean;
  two_fa_complete: boolean;
  status: UserStatus;
  intra_name: string;
  language: string;
  iat: number;
  exp: number;
}

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
  const [nickname, setNickname] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const { currentStep, nextStep, prevStep } = useRegistrationSteps();
  const [myInfo, setMyInfo] = useRecoilState(myState);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [showResponseModal, setShowResponseModal] = useState<boolean>(false);
  const [hasErrorOnResponse, setHasErrorOnResponse] = useState(false);
  const router = useRouter();

  // 상태 업데이트
  const updateMyInfo = (newNickname: string, newAvatar: string) => {
    setMyInfo((prevInfo) => ({
      ...prevInfo,
      nickname: newNickname,
      avatar: newAvatar,
    }));
  };

  const UserRegisterFinished = async () => {
    const data: UserRegisterDataDto = {
      nickname,
      avatar,
    };
    try {
      await axiosCreateUser(data);
      updateMyInfo(nickname, avatar);
      createConfetti({
        angle: 90,
        gravity: 0.5,
        origin: { x: 0.5, y: 0.8 },
        particleCount: 400,
        spread: 150,
      });

      setModalTitle("회원가입에 성공했습니다!");
      setTimeout(() => {
        router.replace("/");
      }, 4000);
    } catch (error: any) {
      // router.replace("/login");
      prevStep();
      prevStep();
      setModalTitle(
        error.response.data
          ? error.response.data.message
          : "알 수 없는 오류가 발생했습니다.",
      );
      setHasErrorOnResponse(true);
      // throw error;
    } finally {
      setShowResponseModal(true);
    }
  };

  const checkNickname = (nickname: string) => {
    const regExp = /^[a-zA-Z0-9_-]{4,16}$/;
    return regExp.test(nickname);
  };

  const submitNickname = () => {
    if (checkNickname(nickname)) {
      nextStep();
    } else {
      setIsValid(false);
      setTimeout(() => {
        setIsValid(true);
      }, 500);
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e || !e.target || !e.target.files) return;
    const file = e.target.files[0];
    try {
      const fileSize = file.size / 1024 ** 2;
      if (fileSize > 1.37) {
        throw new Error("1MB 이하의\n파일을 선택해주세요");
      }
      const base64 = await convertBase64(file);
      setAvatar(base64);
      setModalTitle("파일 업로드에 성공했습니다");
    } catch (err: any) {
      if (err.message) {
        setModalTitle(err.message);
      } else {
        setModalTitle("파일 업로드에 실패했습니다");
      }
      setHasErrorOnResponse(true);
    } finally {
      setShowResponseModal(true);
    }
  };

  const handleChangeAvatar = async () => {
    const imageUploadInput = document.getElementById(
      "imageUploadInput",
    ) as HTMLInputElement;
    if (!imageUploadInput) return;
    imageUploadInput.click();
  };

  const handleCloseResponseModal = () => {
    setShowResponseModal(false);
    setHasErrorOnResponse(false);
  };

  useEffect(() => {
    const token = getCookie("access_token");
    if (!token) {
      router.replace("/login");
    } else {
      try {
        const decodedToken: IToken = jwtDecode(token);
        if (decodedToken.nickname != null) {
          router.replace("/");
        }
      } catch (error) {
        router.replace("/");
      }
    }
  }, []);

  return (
    <>
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
                <ProfileImage showBorder={true} borderRadius={40} />
                <InputContainerStyled $isValid={isValid}>
                  <input
                    type="text"
                    placeholder="..."
                    value={nickname}
                    minLength={3}
                    maxLength={12}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        submitNickname();
                      }
                    }}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </InputContainerStyled>
                <PillButton
                  text="확인"
                  width="260px"
                  fontWeight="400"
                  theme="purple"
                  onClick={submitNickname}
                />
              </>
            </Card>
          )}
          {currentStep === UserRegisterCard.Avatar && (
            <Card title="아바타를 선택해주세요">
              <>
                <ImageUploadInputStyled
                  id="imageUploadInput"
                  type="file"
                  accept="image/*"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleImageUpload(e);
                  }}
                />
                <ProfileImageWrapperStyled
                  onClick={(e) => {
                    handleChangeAvatar();
                  }}
                >
                  <ProfileImage showBorder={true} borderRadius={40} />
                </ProfileImageWrapperStyled>
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
          {currentStep === UserRegisterCard.Welcome && (
            <Card title="Welcome!">
              <ProfileInfoWrapperStyled>
                <ProfileImage showBorder={true} borderRadius={40} />
                <NicknameContainerStyled>{nickname}</NicknameContainerStyled>
              </ProfileInfoWrapperStyled>
            </Card>
          )}
        </RegisterCardsWrapperStyled>
      </RegisterPageStyled>
      {showResponseModal &&
        (hasErrorOnResponse ? (
          <FailResponseModal
            modalTitle={modalTitle}
            closeModal={handleCloseResponseModal}
          />
        ) : (
          <SuccessResponseModal
            modalTitle={modalTitle}
            closeModal={handleCloseResponseModal}
          />
        ))}
    </>
  );
}

export const shakeAnimation = keyframes`
  0% { transform: translateX(0); }
  20% { transform: translateX(-5px); }
  40% { transform: translateX(5px); }
  60% { transform: translateX(-5px); }
  80% { transform: translateX(5px); }
  100% { transform: translateX(0); }
`;

const RegisterPageStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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

const RegisterCardsWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const InputContainerStyled = styled.div<{ $isValid: boolean }>`
  display: flex;
  align-items: center;

  input {
    width: 300px;
    height: 70px;
    outline: none;
    border: 3px solid var(--main-purple);
    color: var(--main-purple);
    animation: ${(props) => (props.$isValid ? "none" : shakeAnimation)} 0.4s;
    font-size: 1.75rem;
    padding: 0 1rem;
    border-radius: 20px;
    margin-top: 2rem;
  }
  input::placeholder {
    color: var(--main-purple);
    font-style: italic;
    font-size: 1rem;
  }
`;

const ImageUploadInputStyled = styled.input`
  display: none;
`;

const ProfileImageWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  pointer-events: none;

  // put upload icon on the left side of the image
  &::after {
    content: "";
    position: absolute;
    width: 60px;
    height: 60px;
    background: url("/upload.svg") no-repeat center;
    background-size: 50%;
    transform: translateX(150%);
    /* opacity: 0.6; */
    z-index: 10;
    pointer-events: initial;
    cursor: pointer;
  }
`;

const ProfileInfoWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const NicknameContainerStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* width: 100%; */
  color: var(--main-purple);
  font-size: 1.75rem;
`;
