import styled from "styled-components";
import FriendSectionOnlineCount from "./friend-section-online-count";
import followlist from "../followlist-mock";
import FriendSectionFriendList from "./friend-section-friend-list";

const FriendSection = () => {
  return (
    <FriendSectionStyled>
      <FriendSectionOnlineCount friendList={followlist} />
      <FriendSectionFriendList friendList={followlist} />
      {/* <TopSectionStyled>
        <TopButtonGroupStyled>
          <FriendSectionButtonList />
        </TopButtonGroupStyled>
      </TopSectionStyled>
      <BottomSectionStyled>
        <FriendSectionButtonContainerStyled>
          <LogoutIcon />
        </FriendSectionButtonContainerStyled>
      </BottomSectionStyled> */}
    </FriendSectionStyled>
  );
};

const FriendSectionStyled = styled.section`
  display: flex;
  background-color: var(--gray);
  width: 240px;
  min-width: 240px;
  flex-direction: column;
  /* height: 100%; */
`;

export default FriendSection;
