import styled from "styled-components";
import Search from "@/components/SearchUser";
import TopNavLogo from "./topnav-logo";
import TopNavTextLogo from "./topnav-textlogo";

export default function Topnav() {
  return (
    <TopNavStyled>
      <SideBarSectionStyled>
        <LogoSectionStyled>
          <TopNavLogo />
        </LogoSectionStyled>
        <FriendSectionStyled>
          <TopNavTextLogo />
        </FriendSectionStyled>
      </SideBarSectionStyled>
      <div className="mr-10">
        <Search placeholder="Search User" />
      </div>
    </TopNavStyled>
    // <div className="bgGrayColor flex h-full  w-full flex-col border-b-2 border-neutral-800">
    //   <div className="relative h-[100px] w-full flex-shrink-0">
    //     <div className="absolute right-[50px] top-[20px]">
    //       <Search placeholder="Search User" />
    //     </div>
    //   </div>
    // </div>
  );
}

const TopNavStyled = styled.nav`
  width: 100%;
  height: 90px;
  min-height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
`;

const SideBarSectionStyled = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const LogoSectionStyled = styled.div`
  width: 90px;
  height: 90px;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: var(--dark-gray);
  transition: background-color 0.3s ease-in-out;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 80%;
    height: 1px;
    background-color: var(--line-color-gray);
  }

  @media only screen and (max-width: 1000px) {
    background-color: var(--background-gray);
    transition: background-color 0.3s ease-in-out;
    &::after {
      display: none;
    }
  }
`;

const FriendSectionStyled = styled.div`
  width: 240px;
  height: 90px;
  display: flex;
  align-items: flex-start;
  position: relative;
  align-items: center;
  background-color: var(--gray);
  border-bottom: 2px solid var(--line-color-dark-gray);
  padding-left: 1.5rem;
`;
