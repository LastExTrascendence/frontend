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
        {/* <div className="bg-rNavColor hidden w-1/5 min-w-[60px] flex-none md:block">
          <SideNavFollowList />
        </div> */}
        {children}
      </MainSectionStyled>
    </>
  );
}

const MainSectionStyled = styled.main`
  display: flex;
  height: calc(100% - 90px);
  width: 100%;
  overflow: hidden;
`;
