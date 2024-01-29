import { useTranslation } from "react-i18next";
import styled from "styled-components";
import SearchUser from "@/components/SearchUser";
import TopNavLogo from "./topnav-logo";
import TopNavTextLogo from "./topnav-textlogo";

export default function Topnav() {
  const { t } = useTranslation("common");

  return (
    <TopNavStyled>
      <SideBarSectionStyled>
        <LogoSectionStyled id="topNavLogo">
          <TopNavLogo />
        </LogoSectionStyled>
        <FriendSectionStyled id="topNavTextLogo">
          <TopNavTextLogo />
        </FriendSectionStyled>
      </SideBarSectionStyled>
      <MainSectionStyled>
        <SearchBarWrapperStyled>
          <SearchUser placeholder={t("searchUser")} />
        </SearchBarWrapperStyled>
      </MainSectionStyled>
    </TopNavStyled>
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

  @media (max-height: 666px) {
    display: none;
  }
`;

const SideBarSectionStyled = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 0;
  }

  @media only screen and (max-width: 1000px) {
    &::after {
      width: 100%;
      height: 2px;
      background-color: var(--line-color-dark-gray);
    }
  }
`;

const LogoSectionStyled = styled.div`
  width: 90px;
  height: 90px;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: var(--dark-gray);

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 80%;
    height: 1px;
    background-color: var(--line-color-light-gray);
  }

  @media only screen and (max-width: 1000px) {
    background-color: var(--background-gray);
    transition: background-color 0.3s ease-in-out;

    &::after {
      width: 100%;
      height: 2px;
      background-color: var(--line-color-dark-gray);
    }
  }
`;

const FriendSectionStyled = styled.div`
  width: 240px;
  height: 90px;
  display: flex;
  position: relative;
  align-items: center;
  background-color: var(--gray);
  border-bottom: 2px solid var(--line-color-gray);
  padding-left: 1.5rem;
`;

const MainSectionStyled = styled.div`
  width: calc(100% - 240px - 90px);
  height: 90px;
  display: flex;
  position: relative;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 2px solid var(--line-color-dark-gray);
`;

const SearchBarWrapperStyled = styled.div`
  margin-right: 1.5rem;
`;
