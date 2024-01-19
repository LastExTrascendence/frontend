import styled from "styled-components";
import ProfileImage from "@/ui/profile-image";
import { UserStatus } from "@/types/enum/user.enum";
import { UserInfoDto } from "@/types/interface/user.interface";

export default function FriendSectionCard({
  friend,
  width,
  height,
}: {
  friend: UserInfoDto;
  width: number;
  height: number;
}) {
  return (
    <FriendContainerStyled>
      <FriendInfoWrapperStyled $status={friend.status}>
        <ProfileImage
          src={friend.avatar || "/default_profile.svg"}
          width={width}
          height={height}
          showOutline={true}
        />
        <UserStatusStyled $status={friend.status}></UserStatusStyled>
        <UserNicknameWrapperStyled $width={width}>
          <UserNickNameStyled>{friend.nickname}</UserNickNameStyled>
        </UserNicknameWrapperStyled>
      </FriendInfoWrapperStyled>
    </FriendContainerStyled>
  );
}

const FriendContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70px;
  min-height: 70px;
  align-items: center;
  justify-content: center;
  position: relative;
  &::after {
    content: "";
    position: relative;
    top: 10px;
    width: 95%;
    height: 1px;
    background-color: var(--line-color-light-gray);
  }
`;

const FriendInfoWrapperStyled = styled.div<{ $status: UserStatus }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 1.5rem;
  opacity: ${({ $status }) => ($status === UserStatus.ONLINE ? "1" : "0.5")};
`;

export const UserStatusStyled = styled.div<{ $status: UserStatus }>`
  height: 18px;
  width: 18px;
  position: absolute;
  margin-left: 32px;
  margin-top: 32px;
  border-radius: 50%;
  border: 1px solid var(--light-gray);
  z-index: 1;
  background-color: ${({ $status }) =>
    $status === UserStatus.ONLINE
      ? "var(--green)"
      : $status === UserStatus.OFFLINE
        ? "var(--light-gray)"
        : "var(--yellow)"};
`;

export const UserNicknameWrapperStyled = styled.div<{ $width: number }>`
  display: flex;
  width: calc(100% - ${({ $width }) => $width}px);
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const UserNickNameStyled = styled.p`
  font-size: 1.2rem;
  color: var(--white);
  font-weight: 400;
`;
