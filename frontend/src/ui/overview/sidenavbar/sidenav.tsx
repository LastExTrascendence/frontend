import styled from "styled-components";
import SideNavButtonList, {
  SideNavButtonContainerStyled,
} from "./sidenav-button-list";
import LogoutIcon from "@/ui/icon/logout-icon";

const SideNav = () => {
  return (
    <SideNavWrapperStyled id="sideNavWrap">
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
