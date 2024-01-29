"use client";

import styled from "styled-components";
import FriendSection from "@/ui/overview/sidenavbar/friend/friend-section";
import SideNav from "@/ui/overview/sidenavbar/sidenav";
import Topnav from "@/ui/overview/topnavbar/topnav";
import { useMenu } from "@/hooks/useMenu";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { closeAll } = useMenu();

  return (
    <>
      <Topnav />
      <MainSectionStyled>
        <div id="sideNavWrap" className="flex z-20 ">
          <SideNav />
          <FriendSection />
        </div>
        <BackgroundStyled id="background" onClick={closeAll} />
        <MainSectionBackgroundStyled
          id="mainSectionBackground"
          onClick={closeAll}
        />
        {children}
      </MainSectionStyled>
    </>
  );
}

const MainSectionStyled = styled.main`
  display: flex;
  height: calc(100vh - 90px);
  width: 100%;
  overflow: hidden;

  @media (max-height: 666px) {
    height: 100vh;
  }
`;

const BackgroundStyled = styled.div`
  position: none;
`;

const MainSectionBackgroundStyled = styled.div`
  position: none;
`;
