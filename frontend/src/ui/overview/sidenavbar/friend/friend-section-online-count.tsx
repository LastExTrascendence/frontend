import styled from "styled-components";
import { STATUS_400_BAD_REQUEST } from "@/types/constants/status-code";
import { UserFriendListResponseDto } from "@/types/dto/user.dto";
import { UserInfoDto } from "@/types/interface/user.interface";
import { useTranslation } from "react-i18next";

function FriendSectionOnlineCount({
  friendList,
}: {
  friendList: UserFriendListResponseDto;
}) {
  const { t } = useTranslation("common");
  if (friendList === undefined || friendList === STATUS_400_BAD_REQUEST) {
    return <></>;
  }

  const onlineCount = friendList.filter(
    (person: UserInfoDto) => person.status === "ONLINE",
  ).length;

  return (
    <OnlineCountContainerStyled>
      <OnlineCountTextWrapperStyled>
        <OnlineCountTextStyled>
          {t("online")} ({onlineCount}/{friendList.length})
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
  margin: 1rem 0;
`;

const OnlineCountTextStyled = styled.p`
  font-size: 1.25rem;
  color: var(--white);
  font-weight: 400;
`;

export default FriendSectionOnlineCount;
