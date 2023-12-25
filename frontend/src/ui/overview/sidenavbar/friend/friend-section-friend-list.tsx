import styled from "styled-components";
import { FollowlistProps } from "@/lib/definitions";
import ProfileImage from "@/ui/profile-image";

export default function FriendSectionFriendList({
  friendList = [],
}: {
  friendList: FollowlistProps[];
}) {
  // nextjs에서 fetch를 사용해서 follow list를 가져온다.
  // const followList = fetch();

  return (
    <FriendListContainerStyled>
      {friendList.map((friend) => (
        <FriendContainerStyled>
          <FriendInfoWrapperStyled
            status={friend.online ? "online" : "offline"}
          >
            <ProfileImage width={50} height={50} showOutline={true} />
            <FriendStatusWrapperStyled
              status={friend.online ? "online" : "offline"}
            ></FriendStatusWrapperStyled>
            <FriendNicknameWrapperStyled>
              <FriendNicknameStyled>{friend.id}</FriendNicknameStyled>
            </FriendNicknameWrapperStyled>
          </FriendInfoWrapperStyled>
        </FriendContainerStyled>
      ))}
    </FriendListContainerStyled>
  );
}

const FriendListContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const FriendContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70px;
  align-items: center;
  justify-content: center;
  &::after {
    content: "";
    position: relative;
    top: 10px;
    width: 95%;
    height: 1px;
    background-color: var(--line-color-light-gray);
  }
`;

const FriendInfoWrapperStyled = styled.div<{ status: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 1.5rem;
  opacity: ${({ status }) => (status === "online" ? "1" : "0.5")};
`;

const FriendStatusWrapperStyled = styled.div<{ status: string }>`
  height: 18px;
  width: 18px;
  position: fixed;
  margin-left: 32px;
  margin-top: 32px;
  border-radius: 50%;
  border: 1px solid var(--line-color-light-gray);
  z-index: 1;
  background-color: ${({ status }) =>
    status === "online"
      ? "var(--green)"
      : status === "offline"
        ? "var(--light-gray)"
        : "var(--yellow)"};
`;

const FriendNicknameWrapperStyled = styled.div`
  display: flex;
  width: calc(100% - 50px);
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FriendNicknameStyled = styled.p`
  font-size: 1.5rem;
  color: var(--white);
  font-weight: 400;
`;
