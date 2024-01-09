import styled from "styled-components";
import LogoutIcon from "@/ui/icon/logout-icon";
import TopNavLogo from "../topnavbar/topnav-logo";
import { SideNavButtonContainerStyled } from "./sidenav-button-list";
import SideNavButtonList from "./sidenav-button-list";

const SideNav = () => {
  return (
    <SideNavWrapperStyled>
      <LogoSectionStyled id="topNavLogo">
        <TopNavLogo />
      </LogoSectionStyled>
      <SideNavStyled>
        <TopSectionStyled>
          <TopButtonGroupStyled>
            <SideNavButtonList />
          </TopButtonGroupStyled>
        </TopSectionStyled>
        <BottomSectionStyled>
          <SideNavButtonContainerStyled>
            <LogoutIcon />
          </SideNavButtonContainerStyled>
        </BottomSectionStyled>
      </SideNavStyled>
    </SideNavWrapperStyled>
  );
};

const SideNavWrapperStyled = styled.div`
  display: flex;
  background-color: var(--dark-gray);
`;

const LogoSectionStyled = styled.div`
  width: 90px;
  height: 90px;
  display: flex;
  position: fixed;
  top: -90px;
  left: 0;
  justify-content: center;
  align-items: center;
  background-color: var(--dark-gray);
  transition: background-color 0.3s ease-in-out;
  z-index: 10;

  &::after {
    content: "";
    position: fixed;
    top: 0;
    width: 100%;
    height: 2px;
    background-color: var(--line-color-dark-gray);
  }
`;

const SideNavStyled = styled.div`
  width: 90px;
  min-width: 90px;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  position: relative;
`;

const TopSectionStyled = styled.section`
  position: relative;
`;

const TopButtonGroupStyled = styled.ul`
  text-align: center;
  padding: 30px 5px;
`;

const BottomSectionStyled = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

export default SideNav;
