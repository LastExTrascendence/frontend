import React from "react";
import styled, { css } from "styled-components";
import PillButton from "../pill-button";
import Button from "@/ui/button";

/**
 * @description Modal 타입 (확인 버튼 유무)
 * @param hasProceedBtn 확인 버튼 있음 (취소 버튼으로 Modal 닫기)
 * @param noBtn 확인 버튼 없음 (모달 내/외부 클릭으로 Modal 닫기)
 */
export enum ModalTypes {
  hasProceedBtn = "hasProceedBtn",
  noBtn = "noBtn",
}

/**
 * @description Modal 컴포넌트의 props
 * @param type Modal 타입 (확인 버튼 유무)
 * @param icon Modal 상단에 띄울 아이콘
 * @param iconScaleEffect Modal 상단에 띄울 아이콘에 scale 효과 적용 여부
 * @param title Modal 제목
 * @param detail Modal 본문
 * @param children Modal 내부 content
 * @param proceedBtnText 확인버튼 텍스트 (기본값: 확인)
 * @param onClickProceed 확인버튼 클릭 시 동작 함수
 * @param cancleBtnText 취소버튼 텍스트 (기본값: 취소)
 * @param closeModal 모달 닫는 함수
 */
export interface IModalContents {
  type: ModalTypes;
  icon?: string;
  iconScaleEffect?: boolean;
  title?: string;
  detail?: string;
  children: React.ReactElement;
  proceedBtnText?: string;
  onClickProceed?: ((e: React.MouseEvent) => Promise<void>) | null;
  cancleBtnText?: string;
  closeModal: React.MouseEventHandler;
}

export default function Modal({
  type,
  icon,
  iconScaleEffect,
  title,
  detail,
  children,
  proceedBtnText,
  onClickProceed,
  cancleBtnText,
  closeModal,
}: IModalContents) {
  return (
    <>
      <BackgroundStyled
        onClick={(e) => {
          closeModal(e);
        }}
      />
      <ModalStyled
        onClick={type === "noBtn" ? closeModal : undefined}
        $width={"350px"}
        $height={"auto"}
      >
        <ModalContentWrapperStyled $width={"auto"} $height={"auto"}>
          {/* {icon && (
            <ModalIconImgStyled src={icon} iconScaleEffect={iconScaleEffect} />
          )} */}
          <H2Styled>{title}</H2Styled>
          {children}
          {type === "hasProceedBtn" && (
            <ButtonWrapperStyled>
              <PillButton
                width="120px"
                height="40px"
                onClick={closeModal}
                text={cancleBtnText || "취소"}
                theme="white"
              />
              <PillButton
                width="120px"
                height="40px"
                onClick={(e: React.MouseEvent) => {
                  onClickProceed!(e);
                }}
                text={proceedBtnText || "확인"}
                theme="purple"
              />
            </ButtonWrapperStyled>
          )}
        </ModalContentWrapperStyled>
      </ModalStyled>
    </>
  );
}

const BackgroundStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgb(0, 0, 0);
  opacity: 0.4;
  animation: fadeInBg 0.5s;
  @keyframes fadeInBg {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.4;
    }
  }
  z-index: 100;
`;

const ModalStyled = styled.div<{
  $width: string;
  $height: string;
}>`
  position: fixed;
  top: 50%;
  left: 50%;
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  z-index: 1000;
  transform: translate(-50%, -50%);
  animation: fadeInModal 0.5s;
  @keyframes fadeInModal {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1.5;
    }
  }
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  padding: 1.5rem;
  border-radius: 4.5rem;
  background: var(--light-gray);
`;

const ModalContentWrapperStyled = styled.div<{
  $width: string;
  $height: string;
}>`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  border-radius: 4rem;
  background: var(--white);
  box-shadow: 0px 0.25rem 0.25rem 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 1rem 0.5rem 2rem;
`;

const ModalIconImgStyled = styled.img<{ iconScaleEffect: boolean | undefined }>`
  width: 70px;
  margin-bottom: 20px;
  ${(props) =>
    props.iconScaleEffect &&
    css`
      animation: scaleUpModalIcon 1s;
      @keyframes scaleUpModalIcon {
        0% {
          width: 0px;
        }
        100% {
          width: 70px;
        }
      }
    `}
`;

export const DetailStyled = styled.p`
  margin-top: 20px;
  letter-spacing: -0.02rem;
  line-height: 1.5rem;
  font-size: 14px;
  font-weight: 300;
  white-space: break-spaces;
`;

const H2Styled = styled.h2`
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1.75rem;
  white-space: break-spaces;
  margin-bottom: 1rem;
  /* color: var(--main-purple); */
`;

const ButtonWrapperStyled = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  margin-top: 30px;
`;
