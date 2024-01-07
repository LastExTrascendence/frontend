"use client";

import styled from "styled-components";
import Topnav from "@/ui/overview/topnavbar/topnav";
import SideNav from "@/ui/overview/sidenavbar/sidenav";
import FriendSection from "@/ui/overview/sidenavbar/friend/friend-section";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Topnav />
      <MainSectionStyled>
        <div id="sideNavWrap" className="flex">
          <SideNav />
          <FriendSection />
        </div>
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
`;
