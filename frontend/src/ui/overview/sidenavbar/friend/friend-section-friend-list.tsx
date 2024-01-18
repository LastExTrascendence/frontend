import Link from "next/link";
import styled from "styled-components";
import { STATUS_400_BAD_REQUEST } from "@/types/constants/status-code";
import { UserFriendListResponseDto } from "@/types/dto/user.dto";
import { UserInfoDto } from "@/types/interface/user.interface";
import FriendSectionCard from "./friend-section-card";

export default function FriendSectionOnlineCount({
  friendList,
}: {
  friendList: UserFriendListResponseDto;
}) {
  if (friendList === undefined || friendList === STATUS_400_BAD_REQUEST) {
    return (
      <div className="flex justify-center items-center h-full text-white">
        <p>친구가 없어요!</p>
      </div>
    );
  }

  return (
    <FriendListContainerStyled>
      {friendList.map((friend) => (
        <Link key={friend.id} href={`/dm/${friend.nickname}`}>
          <FriendSectionCard
            key={friend.id}
            friend={friend}
            width={50}
            height={50}
          />
        </Link>
      ))}
      {/* NOTE: Below is a dummy data for longer followlist */}
      {friendList.map((friend) => (
        <Link key={friend.id} href={`/dm/${friend.nickname}`}>
          <FriendSectionCard
            key={friend.id + " " + friend.nickname}
            friend={friend}
            width={50}
            height={50}
          />
        </Link>
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
