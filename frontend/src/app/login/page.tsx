"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import Card from "@/ui/card";
import PillButton from "@/ui/pill-button";

export default function Page() {
  return (
    <LoginPageStyled>
      <LeftSideStyled>
        <LoginTitleWrapperStyled>
          <LoginTitleStyled $fontWeight="800">마지막</LoginTitleStyled>
          <LoginTitleStyled $fontStyle="italic" $fontWeight="700">
            Last
          </LoginTitleStyled>
          <LoginTitleStyled $fontWeight="800">구</LoginTitleStyled>
          <LoginTitleStyled $fontStyle="italic" $fontWeight="700">
            Ex
          </LoginTitleStyled>
          <LoginTitleStyled $fontWeight="800">트렌센던스</LoginTitleStyled>
          <LoginTitleStyled $fontStyle="italic" $fontWeight="700">
            Transcendence
          </LoginTitleStyled>
        </LoginTitleWrapperStyled>
      </LeftSideStyled>
      <RightSideStyled>
        <Card>
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
              A minimalistic pong service
            </CardDescriptionStyled>
            <Link
              href={`https://api.intra.42.fr/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code`}
              passHref={true}
            >
              <PillButton
                text="Join via 42 Network"
                fontWeight="200"
                theme="purple"
                onClick={() => {}}
              />
            </Link>
          </>
        </Card>
      </RightSideStyled>
    </LoginPageStyled>
  );
}

const LoginPageStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    overflow: auto;
  }
`;

const LeftSideStyled = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    height: 60%;
  }
`;

const LoginTitleWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LoginTitleStyled = styled.div<{
  $fontStyle?: string;
  $fontWeight: string;
}>`
  font-size: 6rem;
  font-weight: ${(props) => props.$fontWeight};
  font-style: ${(props) => props.$fontStyle};
  color: var(--white);
  word-break: keep-all;

  @media (max-width: 768px) {
    font-size: 2.4rem;
  }
`;

const RightSideStyled = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    height: 40%;
  }
`;

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
  height: 180px;
  font-size: 1.25rem;
  font-weight: 300;
  color: var(--main-purple);
  font-style: italic;
  justify-content: center;
  align-items: center;
`;