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

export const TwoFAModal = ({ closeModal }: { closeModal: () => void }) => {
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
    if (!qrcode || !otpCode || otpCode.length !== 6) return;
    try {
      await axiosVerifyOTP(otpCode);
      setModalTitle("인증에 성공했습니다");
      setShowResponseModal(true);
      closeModal();
    } catch (error: any) {
      console.log(error);
      setIsOtpCodeValid(false);
      setOtpCode("");
    }
  };

  return (
    <ModalPortal>
      {!showResponseModal && (
        <Modal
          type={ModalTypes.hasProceedBtn}
          proceedBtnText="인증하기"
          onClickProceed={tryVerifyOTP}
          cancleBtnText="취소"
          closeModal={closeModal}
        >
          <div>
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
            <div>인증번호를 입력해주세요</div>
            <OtpCodeInputStyled
              type="text"
              placeholder="Enter OTP"
              $isValid={isOtpCodeValid}
              onChange={(e) => {
                setOtpCode(e.target.value);
              }}
            />
          </div>
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

const OtpCodeInputStyled = styled.input<{ $isValid: boolean }>`
  width: 70%;
  height: 55px;
  border: 1px solid var(--main-purple);
  border-radius: 10px;
  font-size: 1.25rem;
  font-weight: 300;
  color: var(--main-purple);
  font-style: italic;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-bottom: 1rem;
  animation: ${(props) => (props.$isValid ? "none" : shakeAnimation)} 0.4s;
`;
