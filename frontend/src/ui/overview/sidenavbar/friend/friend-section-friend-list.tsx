import styled from "styled-components";
import FriendSectionCard from "./friend-section-card";
import { UserInfoDto } from "@/types/interface/user.interface";

export default function FriendSectionFriendList({
  friendList = [],
}: {
  friendList: UserInfoDto[];
}) {
  return (
    <FriendListContainerStyled>
      {friendList.map((friend) => (
        <FriendSectionCard
          key={friend.id}
          friend={friend}
          width={50}
          height={50}
        />
      ))}
      {/* NOTE: Below is a dummy data for longer followlist */}
      {friendList.map((friend) => (
        <FriendSectionCard
          key={friend.id + " " + friend.id}
          friend={friend}
          width={50}
          height={50}
        />
      ))}
    </FriendListContainerStyled>
  );
}

const FriendListContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow-y: auto;
`;
