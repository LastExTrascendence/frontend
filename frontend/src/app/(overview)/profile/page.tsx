"use client";
import UserCardInfo from "@/ui/user-status/user-card";
import followlist from "@/ui/overview/sidenavbar/followlist-mock";
import styled from "styled-components";
import UserStatusSetting from "@/ui/user-status/user-card-setting";

export default function Page() {
  return (
    <UserProfileContainerStyled>
      {/* <UserProfileStyled>
        <UserProfile>
          <UserStatusSetting />
        </UserProfile>

        <UserProfileSummary>
          <UserCardInfo followList={followlist} />
        </UserProfileSummary>
      </UserProfileStyled> */}
    </UserProfileContainerStyled>
  );
}

const UserProfileContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const UserProfileSummary = styled.div`
  flex: 1;
  border-radius: 0 20px 20px 0;
  /* padding: 1rem; */
  background-color: #232428;
`;

const UserProfile = styled.div`
  flex: 2.5;
  border-radius: 20px 0 0 20px;
  /* padding: 1rem; */
  background-color: #2b2d31;
`;

const UserProfileStyled = styled.div`
  /* border-radius: 30px; */
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 95%;
  /* background-color: black; */
`;
