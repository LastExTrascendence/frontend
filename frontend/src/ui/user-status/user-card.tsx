"use client";

import { FollowlistProps } from "@/lib/definitions";
import user from "@/lib/user-data";
import Image from "next/image";
import styled from "styled-components";
import followlist from "@/ui/overview/sidenavbar/followlist-mock";

export default function UserCardInfo({
  followList = [],
}: {
  followList: FollowlistProps[];
}) {
  // 나중에 DB와 연결 -> user-data.js와 연걀
  const userId = "miyu";
  const user = followlist.find(
    (person: FollowlistProps) => person.id === userId,
  );
  if (!user) {
    console.error(`User with ID '${userId}' not found in the followList.`);
    return null;
  }
  return (
    <UserCardContainer>
      <ImageContainer>
        <UserImage src={user.profile} alt="profile" />
        <UserInfo>
          <div>
            <UserInfoNick>TestNickname</UserInfoNick>
            <UserInfoId>IntraID@student.42seoul.kr</UserInfoId>
            <UserInfoEmail>Email</UserInfoEmail>
          </div>
          <UserInfoDescriptionContainer>
            <UserInfoRow>
              <UserInfoDescription>Total Game : </UserInfoDescription>
              <UserInfoDescription>0</UserInfoDescription>
            </UserInfoRow>
            <UserInfoRow>
              <UserInfoDescription>Wins : </UserInfoDescription>
              <UserInfoDescription>0</UserInfoDescription>
            </UserInfoRow>
            <UserInfoRow>
              <UserInfoDescription>Loses : </UserInfoDescription>
              <UserInfoDescription>0</UserInfoDescription>
            </UserInfoRow>
          </UserInfoDescriptionContainer>
        </UserInfo>
      </ImageContainer>
    </UserCardContainer>
  );
}

const UserInfoRow = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
`;

const UserInfoNick = styled.div`
  width: 162px;
  color: #fff;
  font-family: Noto Sans KR;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const UserInfoId = styled.div`
  color: #fff;
  font-family: Noto Sans KR;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const UserInfoEmail = styled.div`
  color: #fff;
  font-family: Noto Sans KR;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const UserInfoDescription = styled.div``;

const UserInfo = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: */
  /* align-items: flex-end; */
  padding-left: 19px;
  padding-top: 13px;
  width: 300px;
  height: 300px;
  flex-shrink: 0;
  border-radius: 20px;
  background: #313338;
`;

const UserInfoDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 19px;

  padding: 27px;
  width: 260px;
  height: 160px;
  flex-shrink: 0;
  border-radius: 20px;
  color: #fff;
  font-family: Noto Sans KR;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background: #2b2d31;
`;

const UserImage = styled.img`
  margin-bottom: 40px;
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  border-radius: 40px;
  border: 5px solid #827baf;
  background: lightgray 0.836px -0.835px / 100% 141.803% no-repeat;
`;

const UserCardContainer = styled.div`
  position: relative;
  width: 400px;
  height: 881px;
  flex-shrink: 0;
  border-radius: 0 20px 20px 0;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: -300px;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
