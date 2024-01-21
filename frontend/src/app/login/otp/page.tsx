"use client";

import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { IToken } from "@/app/register/page";
import Card from "@/ui/card";
import LoadingAnimation from "@/ui/loading-animation";
import PillButton from "@/ui/pill-button";
import { axiosOTPLogin } from "@/api/axios/axios.custom";
import { getCookie } from "@/api/cookie/cookies";

const token = getCookie("access_token");

export default function Page() {
  const [otp, setOTP] = useState<string>("");
  const [otpCode, setOTPCode] = useState<string>("");
  const router = useRouter();

  const tryOTPLogin = async () => {
    if (!otpCode || otpCode.length !== 6) return;
    try {
      await axiosOTPLogin(otpCode);
    } catch (error) {
      console.log(error);
      setOTPCode("");
    }
  };

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
    const decodedToken: IToken = jwtDecode(token);
    if (decodedToken.two_fa_complete) {
      router.replace("/");
    }
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
        {/* <CardDescriptionStyled>
          A minimalistic pong service
        </CardDescriptionStyled> */}
        <OTPInputContainerStyled>
          <OTPInputStyled
            type="number"
            placeholder="Enter OTP"
            value={otpCode}
            onChange={(e) => setOTPCode(e.target.value)}
          />
        </OTPInputContainerStyled>
        <PillButton
          width="180px"
          height="45px"
          text="LOGIN"
          fontSize="2rem"
          fontWeight="800"
          fontStyle="italic"
          theme="purple"
          onClick={() => tryOTPLogin()}
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
  flex-direction: column;
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
