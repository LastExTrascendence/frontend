"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { myState } from "@/recoil/atom";
import {
  FailResponseModal,
  SuccessResponseModal,
} from "@/components/Modals/ResponseModal/ResponseModal";
import { TwoFAModal } from "@/components/Modals/TwoFAModal/TwoFAModal";
import InputContainer from "@/ui/input-container";
import MultiToggleSwitch, { toggleItem } from "@/ui/multi-toggle-switch";
import PillButton from "@/ui/pill-button";
import UserInfoCard, { UserInfoButtonStyled } from "@/ui/user-info-card";
import { UserCardInfoResponseDto } from "@/types/interface/user.interface";
import {
  axiosMyProfileInfo,
  axiosUpdateMyProfile,
} from "@/api/axios/axios.custom";
import { useMenu } from "@/hooks/useMenu";

export enum TwoFAType {
  ON = "ON",
  OFF = "OFF",
}

const twoFAToggleList: toggleItem[] = [
  { name: "On", key: TwoFAType.ON },
  { name: "Off", key: TwoFAType.OFF },
];

export default function Page() {
  const [twoFA, setTwoFA] = useState<TwoFAType>(TwoFAType.OFF);
  const [nickname, setNickname] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const setMyInfo = useSetRecoilState(myState);
  const [userInfo, setUserInfo] = useState<UserCardInfoResponseDto>(undefined);
  const [updateUserInfo, setUpdateUserInfo] = useState<boolean>(true);
  const [showTwoFAModal, setShowTwoFAModal] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [showResponseModal, setShowResponseModal] = useState<boolean>(false);
  const [hasErrorOnResponse, setHasErrorOnResponse] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const { openUserInfoCard } = useMenu();

  useEffect(() => {
    if (updateUserInfo) {
      getMyProfileInfo();
      setUpdateUserInfo(false);
    }
  }, [updateUserInfo]);

  const updateMyInfo = async (
    newNickname: string,
    newAvatar: string,
    two_fa: boolean,
  ) => {
    try {
      await axiosUpdateMyProfile(newNickname, newAvatar, two_fa);
      setUpdateUserInfo(true);
      setMyInfo((prevInfo) => ({
        ...prevInfo,
        nickname: newNickname,
        avatar: newAvatar,
      }));
      setModalTitle("수정되었습니다");
    } catch (err: any) {
      console.log("error", err);
      setModalTitle("프로필 수정에 실패했습니다");
      setHasErrorOnResponse(true);
    } finally {
      setShowResponseModal(true);
    }
  };

  const getMyProfileInfo = async () => {
    try {
      const { data: userProfileInfo } = await axiosMyProfileInfo();

      setTimeout(() => {
        setUserInfo(userProfileInfo);
        setNickname(userProfileInfo.nickname);
        setTwoFA(userProfileInfo.two_fa ? TwoFAType.ON : TwoFAType.OFF);
      }, 500);
    } catch (err: any) {
      setModalTitle("내 정보를 불러오는데 실패했습니다");
      setHasErrorOnResponse(true);
      setShowResponseModal(true);
    }
  };

  const convertBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        if (fileReader.result !== null) {
          resolve(fileReader.result as string);
        } else {
          reject(new Error("파일 읽기에 실패했습니다"));
        }
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
    if (!e || !e.target || !e.target.files) return;
    const file = e.target.files[0];
    try {
      const fileSize = file.size / 1024 ** 2;
      if (fileSize > 1.37) {
        throw new Error("1MB 이하의\n파일을 선택해주세요");
      }
      const base64 = await convertBase64(file);
      console.log(base64);
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

  const handleToggleChange = (newState: TwoFAType) => {
    if (newState === TwoFAType.ON) {
      setShowTwoFAModal(true);
    } else {
      setIsOtpVerified(false);
    }
    setTwoFA(newState);
  };

  const handleCloseTwoFAModal = () => {
    setShowTwoFAModal(false);
    if (!isOtpVerified) {
      setTwoFA(TwoFAType.OFF);
    }
  };

  const handleCloseResponseModal = () => {
    setShowResponseModal(false);
    setHasErrorOnResponse(false);
  };

  const handleVerifySuccess = () => {
    setIsOtpVerified(true);
  };

  return (
    <>
      <ProfilePageStyled>
        <ProfileContainerStyled>
          <UserConfigAreaStyled>
            <div className="content-start items-center overflow-y-auto">
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
              <PropertyContainerWrapperStyled>
                <PropertyTitleStyled width={"300px"}>
                  Nickname
                </PropertyTitleStyled>
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
                <PropertyTitleStyled width={"300px"}>
                  Avatar
                </PropertyTitleStyled>
                <ButtonContainerStyled>
                  <ImageUploadInputStyled
                    id="imageUploadInput"
                    type="file"
                    accept="image/*"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      handleImageUpload(e);
                    }}
                  />
                  <PillButton
                    width={"140px"}
                    height={"30px"}
                    theme={"purple"}
                    fontSize="1rem"
                    fontWeight="800"
                    fontStyle="italic"
                    text="Change Avatar"
                    onClick={(e) => {
                      handleChangeAvatar();
                    }}
                  />
                  <PillButton
                    width={"140px"}
                    height={"30px"}
                    theme={"gray"}
                    fontSize="1rem"
                    fontWeight="800"
                    fontStyle="italic"
                    text="Remove Avatar"
                    onClick={() => {
                      setAvatar("");
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
                    toggleList={twoFAToggleList}
                    initialState={twoFA}
                    setState={setTwoFA}
                    onToggleChange={handleToggleChange}
                  />
                </ToggleSwitchWrapperStyled>
              </TwoFAWrapperStyled>
              <ButtonGroupStyled>
                <ButtonWrapperStyled>
                  <PillButton
                    width={"100px"}
                    height={"35px"}
                    theme={"purple"}
                    fontSize="1.5rem"
                    fontWeight="800"
                    fontStyle="italic"
                    text="Save"
                    onClick={() => {
                      updateMyInfo(nickname, avatar, twoFA === TwoFAType.ON);
                    }}
                  />
                </ButtonWrapperStyled>
              </ButtonGroupStyled>
            </div>
          </UserConfigAreaStyled>
          <UserInfoCard userInfo={userInfo} />
        </ProfileContainerStyled>
      </ProfilePageStyled>
      {showTwoFAModal && (
        <TwoFAModal
          closeModal={handleCloseTwoFAModal}
          onVerificationSuccess={handleVerifySuccess}
        />
      )}
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

export const ProfilePageStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  /* flex-direction: column; */
  /* align-items: center; */
  justify-content: center;
`;

export const ProfileContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100%);
  height: calc(100%);
  background-color: var(--gray);
  /* margin: 15px 0; */
  border-radius: 20px;

  @media (max-width: 610px) {
    width: calc(100%);
    height: calc(100%);
    margin: 0;
    border-radius: 0;
    justify-content: flex-end;
  }
`;

const UserConfigAreaStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  padding: 2.25rem;

  @media (max-width: 610px) {
    border-radius: 0;
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

const ImageUploadInputStyled = styled.input`
  display: none;
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
  padding-left: 0.5rem;
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
