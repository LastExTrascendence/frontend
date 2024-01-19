"use client";

import Image from "next/image";
// import { useRouter } from "next/navigation";
import qrcode from "qrcode";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "@/ui/card";
import LoadingAnimation from "@/ui/loading-animation";
import PillButton from "@/ui/pill-button";
import { axiosGenerateOTP, axiosVerifyOTP } from "@/api/axios/axios.custom";
import { getCookie } from "@/api/cookie/cookies";

// const token = getCookie("access_token");

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [otp, setOTP] = useState<string>("");
  const [otpCode, setOTPCode] = useState<string>("");

  const tryGenerateOTP = async () => {
    try {
      const response = await axiosGenerateOTP();
      qrcode.toDataURL(response.data, (err: any, url: any) => {
        setTimeout(() => {
          setOTP(url);
        }, 500);
      });
      // setOTP(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const tryVerifyOTP = async () => {
    if (!otpCode) return;
    try {
      await axiosVerifyOTP(otpCode);
    } catch (error) {
      console.log(error);
      setOTPCode("");
    }
  };

  // const url = `${process.env.BE_SERVER}/auth/login`;

  //   const router = useRouter();
  useEffect(() => {
    tryGenerateOTP();
    // if (token) {
    //   router.replace("/");
    // }
  }, []);
  return (
    <Card width="360px" height="420px">
      <>
        <CardTitleWrapperStyled>
          <Image
            src="/LET_logo.svg"
            alt="LET Logo"
            width={48}
            height={48}
            priority
          />
          <CardTitleStyled>L.E.T</CardTitleStyled>
        </CardTitleWrapperStyled>
        <CardDescriptionStyled>
          {otp ? (
            <Image src={`${otp}`} alt="OTP" width={150} height={150} />
          ) : (
            <LoadingAnimation />
          )}
        </CardDescriptionStyled>
        <OTPInputContainerStyled>
          <OTPInputStyled
            type="text"
            placeholder="Enter OTP"
            value={otpCode}
            onChange={(e) => setOTPCode(e.target.value)}
          />
        </OTPInputContainerStyled>
        <PillButton
          width="240px"
          height="55px"
          text="Proceed"
          fontWeight="200"
          fontStyle="italic"
          theme="purple"
          onClick={() => tryVerifyOTP()}
        />
      </>
    </Card>
  );
}

const CardTitleWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const CardTitleStyled = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: var(--main-dark-purple);
  font-style: italic;
  margin-left: 3rem;
`;

const CardDescriptionStyled = styled.div`
  display: flex;
  height: 160px;
  font-size: 1.25rem;
  font-weight: 300;
  color: var(--main-purple);
  font-style: italic;
  justify-content: center;
  align-items: center;
`;

const OTPInputContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const OTPInputStyled = styled.input`
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
`;
