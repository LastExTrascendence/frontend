"use client";
import styled from "styled-components";
import Image from "next/image";
import LinksList from "@/ui/mainpage/links";

export default function Home() {
  return (
    <MainPageStyled>
      <TopNavStyled>
        <Image
          src="/info.svg"
          alt="Logo"
          width={40}
          height={40}
          layout="fixed"
        />
        <TopNavButtonContainer>
          <Image
            src="/logout.svg"
            alt="Logo"
            width={40}
            height={40}
            layout="fixed"
          />
          Logout
        </TopNavButtonContainer>
      </TopNavStyled>
      <MainLogoContainer>
        <MainLogoTitleStyled>L.E.T</MainLogoTitleStyled>
        <Image
          src="/LET_logo.svg"
          alt="Logo"
          width={120}
          height={120}
          layout="absolute"
        />
      </MainLogoContainer>
      <ButtonGroupContainer>
        <LinksList />
      </ButtonGroupContainer>
    </MainPageStyled>
  );
}

const MainPageStyled = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 6rem;
`;

const TopNavStyled = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 0 2rem;
`;

const TopNavButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  color: var(--light-gray);
`;

const MainLogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainLogoTitleStyled = styled.div`
  color: var(--white);
  font-style: italic;
  font-weight: 800;
  font-size: 6rem;
  margin-right: 2rem;
`;

const ButtonGroupContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
