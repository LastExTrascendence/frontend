import styled from "styled-components";
import SideNavLogo from "./sidenav-logo";

const SideNav = () => {
  return (
    <SideNavWrapper>
      <SideNavStyled>
        <LogoSectionStyled>
          <SideNavLogo />
        </LogoSectionStyled>
      </SideNavStyled>
    </SideNavWrapper>
  );
};

const SideNavWrapper = styled.div`
  display: flex;
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
  overflow-x: hidden;
  justify-content: center;
  align-items: center;
`;

export default SideNav;
