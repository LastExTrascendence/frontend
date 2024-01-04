import styled from "styled-components";
import { FollowlistProps } from "@/lib/definitions";
import FriendSectionCard from "./friend-section-card";
import Link from "next/link";

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
        <Link key={friend.id} href={`/dm/${friend.id}`}>
          <FriendSectionCard
            key={friend.id}
            friend={friend}
            width={50}
            height={50}
          />
        </Link>
      ))}
      {/* {friendList.map((friend) => (
        <FriendSectionCard
          key={friend.id + " " + friend.id}
          friend={friend}
          width={50}
          height={50}
        />
      ))} */}
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
