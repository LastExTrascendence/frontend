"use client";
import styled from "styled-components";
import UserInfoCard from "@/ui/user-info-card";

export default function Page() {
  return (
    <UserProfilePageStyled>
      <UserProfileContainerStyled>
        <UserConfigAreaStyled></UserConfigAreaStyled>
        <UserInfoCard />
      </UserProfileContainerStyled>
    </UserProfilePageStyled>
  );
}

const UserProfilePageStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const UserProfileContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 50px);
  height: calc(100% - 50px);
  border-radius: 20px;
  background-color: var(--gray);
`;

const UserConfigAreaStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100% - 300px);
  height: 100%;
  border-radius: 20px;
`;
