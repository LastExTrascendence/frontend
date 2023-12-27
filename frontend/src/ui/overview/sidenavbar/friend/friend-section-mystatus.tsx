import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { myState } from "@/utils/myState";
import ProfileImage from "@/ui/profile-image";
import {
  UserNickNameStyled,
  UserNicknameWrapperStyled,
  UserStatusStyled,
} from "./friend-section-card";

export default function FriendSectionMyStatus() {
  const myInfo = useRecoilValue(myState);

  return (
    <MyStatusContainerStyled>
      <MyStatusWrapperStyled>
        <ProfileImage width={50} height={50} showOutline={true} />
        <UserStatusStyled
          $status={myInfo.online ? "ONLINE" : "OFFLINE"}
        ></UserStatusStyled>
        <UserNicknameWrapperStyled $width={50}>
          <UserNickNameStyled>{myInfo.nickname}</UserNickNameStyled>
        </UserNicknameWrapperStyled>
      </MyStatusWrapperStyled>
    </MyStatusContainerStyled>
  );
}

const MyStatusContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80px;
  min-height: 80px;
  background-color: var(--background-dark-gray);
  align-items: center;
  justify-content: center;
  position: relative;
`;

const MyStatusWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 1.5rem;
`;
