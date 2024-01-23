"use client";

import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { CardTitleStyled, CardTitleWrapperStyled } from "@/app/login/page";
import { IToken } from "@/app/register/page";
import Card from "@/ui/card";
import PillButton from "@/ui/pill-button";
import { axiosOTPLogin } from "@/api/axios/axios.custom";
import { getCookie } from "@/api/cookie/cookies";

export default function Page() {
  const [otpCode, setOTPCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const tryOTPLogin = async () => {
    if (!otpCode || otpCode.length !== 6) return;
    try {
      await axiosOTPLogin(otpCode);
      router.replace("/");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = getCookie("access_token");
    if (!token) {
      router.replace("/login");
    }
    try {
      const decodedToken: IToken = jwtDecode(token);
      if (decodedToken.two_fa_complete) {
        router.replace("/");
      }
    } catch (error) {
      console.log(error);
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
          height="55px"
          text="Login"
          fontSize="2rem"
          fontWeight="800"
          fontStyle="italic"
          theme="purple"
          onClick={() => {
            setIsLoading(true);
            tryOTPLogin();
          }}
          isLoading={isLoading}
        />
      </>
    </Card>
  );
}

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
  /* margin-bottom: 1rem; */
`;
