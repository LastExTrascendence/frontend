import styled from "styled-components";
import FriendSectionOnlineCount from "./friend-section-online-count";
import followlist from "../followlist-mock";
import FriendSectionFriendList from "./friend-section-friend-list";
import FriendSectionMyStatus from "./friend-section-mystatus";

const FriendSection = () => {
  return (
    <FriendSectionStyled>
      <FriendSectionOnlineCount friendList={followlist} />
      <FriendSectionFriendList friendList={followlist} />
      <FriendSectionMyStatus />
    </FriendSectionStyled>
  );
};

const FriendSectionStyled = styled.section`
  display: flex;
  background-color: var(--gray);
  width: 240px;
  min-width: 240px;
  flex-direction: column;
`;

export default FriendSection;
