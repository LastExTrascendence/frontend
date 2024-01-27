import Link from "next/link";
import styled from "styled-components";
import { STATUS_400_BAD_REQUEST } from "@/types/constants/status-code";
import { UserFriendListResponseDto } from "@/types/dto/user.dto";
import { useMenu } from "@/hooks/useMenu";
import FriendSectionCard from "./friend-section-card";
import { useTranslation } from "react-i18next";

export default function FriendSectionOnlineCount({
  friendList,
}: {
  friendList: UserFriendListResponseDto;
}) {
  const { t } = useTranslation("common");
  if (
    friendList === undefined ||
    friendList === STATUS_400_BAD_REQUEST ||
    friendList.length === 0
  ) {
    return (
      <div className="flex justify-center items-center h-full text-white">
        <p>{t("noFriends")}</p>
      </div>
    );
  }

  const { closeSideNav } = useMenu();

  return (
    <FriendListContainerStyled>
      {friendList.map((friend) => (
        <Link
          key={friend.id}
          href={`/dm/${friend.nickname}`}
          onClick={() => closeSideNav()}
        >
          <FriendSectionCard
            key={friend.id}
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
