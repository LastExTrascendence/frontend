"use client";
import styled from "styled-components";
import NavLinksWrapper from "@/ui/overview/sidenavbar/nav-links-wrapper";
import SideNavFollowList from "@/ui/overview/sidenavbar/sidenav-follow-list";
import Topnav from "@/ui/overview/topnavbar/topnav";
import SideNav from "@/ui/overview/sidenavbar/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WrapperStyled>
      <SideNav />
      {/* <div className="bg-lNavColor min-w-[60px] flex-none">
        <NavLinksWrapper />
      </div> */}
      <div className="bg-rNavColor hidden w-1/5 min-w-[60px] flex-none md:block">
        <SideNavFollowList />
      </div>
      <Topnav children={children} />
    </WrapperStyled>
  );
}

const WrapperStyled = styled.div`
  display: flex;
  /* flex-direction: row; */
  height: 100%;
  width: 100%;
  overflow: hidden;
`;
