import styled from "styled-components";
import SideNavLogo from "./sidenav-logo";
import SideNavButtonList, {
  SideNavButtonContainer,
} from "./sidenav-button-list";
import LogoutIcon from "@/ui/icon/logout-icon";

const SideNav = () => {
  return (
    <SideNavWrapper id="sideNavWrap">
      <SideNavStyled>
        <TopSectionStyled>
          <LogoSectionStyled>
            <SideNavLogo />
          </LogoSectionStyled>
          <TopButtonGroupStyled>
            <SideNavButtonList />
          </TopButtonGroupStyled>
        </TopSectionStyled>
        <BottomSectionStyled>
          <SideNavButtonContainer>
            <LogoutIcon />
          </SideNavButtonContainer>
        </BottomSectionStyled>
      </SideNavStyled>
    </SideNavWrapper>
  );
};

const SideNavWrapper = styled.div`
  display: flex;
  background-color: var(--dark-gray);
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

const LogoSectionStyled = styled.div`
  width: 90;
  height: 90px;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 80%;
    height: 1px;
    background-color: var(--line-color-dark);
  }
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
