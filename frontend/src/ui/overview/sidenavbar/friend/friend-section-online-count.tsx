import styled from "styled-components";
import { UserInfoDto } from "@/types/interface/user.interface";

function FriendSectionOnlineCount({
  friendList = [],
}: {
  friendList: UserInfoDto[];
}) {
  const onlineCount = friendList.filter(
    (person: UserInfoDto) => person.status === "ONLINE",
  ).length;

  return (
    <OnlineCountContainerStyled>
      <OnlineCountTextWrapperStyled>
        <OnlineCountTextStyled>
          Online ({onlineCount}/{friendList.length})
        </OnlineCountTextStyled>
      </OnlineCountTextWrapperStyled>
    </OnlineCountContainerStyled>
  );
}

const OnlineCountContainerStyled = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  height: 40px;
  align-items: center;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 95%;
    height: 1px;
    background-color: var(--line-color-light-gray);
  }
`;

const OnlineCountTextWrapperStyled = styled.div`
  width: 100%;
  padding-left: 1.5rem;
`;

const OnlineCountTextStyled = styled.p`
  font-size: 1.5rem;
  color: var(--white);
  font-weight: 400;
`;

export default FriendSectionOnlineCount;
