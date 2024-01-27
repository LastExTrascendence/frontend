import Image from "next/image";
import qrcode from "qrcode";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { shakeAnimation } from "@/app/register/page";
import Modal, { ModalTypes } from "@/components/Modals/Modal";
import ModalPortal from "@/components/Modals/ModalPortal";
import {
  FailResponseModal,
  SuccessResponseModal,
} from "@/components/Modals/ResponseModal/ResponseModal";
import LoadingAnimation from "@/ui/loading-animation";
import { axiosGenerateOTP, axiosVerifyOTP } from "@/api/axios/axios.custom";

export const TwoFAModal = ({
  closeModal,
  onVerificationSuccess,
}: {
  closeModal: () => void;
  onVerificationSuccess: () => void;
}) => {
  const [qrCode, setQrCode] = useState<string>("");
  const [otpCode, setOtpCode] = useState<string>("");
  const [isOtpCodeValid, setIsOtpCodeValid] = useState<boolean>(true);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [showResponseModal, setShowResponseModal] = useState<boolean>(false);
  const [hasErrorOnResponse, setHasErrorOnResponse] = useState(false);

  useEffect(() => {
    tryGenerateOTP();
  }, []);

  const tryGenerateOTP = async () => {
    try {
      const response = await axiosGenerateOTP();
      qrcode.toDataURL(response.data, (err: any, url: any) => {
        setTimeout(() => {
          setQrCode(url);
        }, 500);
      });
    } catch (error) {
      console.log(error);
      setModalTitle("QR Code 생성에 실패했습니다");
      setShowResponseModal(true);
      setHasErrorOnResponse(true);
    }
  };

  const handleCloseResponseModal = () => {
    setShowResponseModal(false);
    closeModal();
  };

  const tryVerifyOTP = async (event: React.MouseEvent) => {
    if (!qrcode || !otpCode || otpCode.length !== 6) {
      setIsOtpCodeValid(false);
      setTimeout(() => {
        setIsOtpCodeValid(true);
      }, 500);
      return;
    }
    try {
      const response = await axiosVerifyOTP(otpCode);
      // console.log(response);
      setModalTitle("인증에 성공했습니다");
      setShowResponseModal(true);
      onVerificationSuccess();
    } catch (error: any) {
      console.log(error);
      setIsOtpCodeValid(false);
      setTimeout(() => {
        setIsOtpCodeValid(true);
      }, 500);
      setOtpCode("");
    }
  };

  return (
    <ModalPortal>
      {!showResponseModal && (
        <Modal
          // title="2-Factor Authentication"
          type={ModalTypes.hasProceedBtn}
          proceedBtnText="Verify"
          onClickProceed={tryVerifyOTP}
          cancelBtnText="Cancel"
          closeModal={closeModal}
        >
          <TwoFAModalWrapperStyled>
            <QRCodeContainerStyled>
              {qrCode ? (
                <Image
                  src={`${qrCode}`}
                  alt="OTP QR Code"
                  width={150}
                  height={150}
                />
              ) : (
                <LoadingAnimation />
              )}
            </QRCodeContainerStyled>
            <OtpCodeDescriptionWrapperStyled>
              <OtpCodeDescriptionStyled>
                QR 코드를 스캔하신 후,
              </OtpCodeDescriptionStyled>
              <OtpCodeDescriptionStyled>
                인증번호를 입력해주세요
              </OtpCodeDescriptionStyled>
            </OtpCodeDescriptionWrapperStyled>
            <OtpCodeInputStyled
              type="number"
              placeholder="Enter OTP"
              $isValid={isOtpCodeValid}
              onChange={(e) => {
                setOtpCode(e.target.value);
              }}
            />
          </TwoFAModalWrapperStyled>
        </Modal>
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
    </ModalPortal>
  );
};

const TwoFAModalWrapperStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const QRCodeContainerStyled = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OtpCodeDescriptionWrapperStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 1rem 0;
`;

const OtpCodeDescriptionStyled = styled.p`
  font-size: 1rem;
  font-weight: 400;
  /* color: var(--main-purple); */
  font-style: italic;
`;

const OtpCodeInputStyled = styled.input<{ $isValid: boolean }>`
  width: 70%;
  height: 55px;
  border: 1px solid var(--main-purple);
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 400;
  color: var(--main-purple);
  font-style: italic;
  padding: 0 1rem;
  margin-bottom: 0.5rem;
  animation: ${(props) => (props.$isValid ? "none" : shakeAnimation)} 0.4s;
`;
