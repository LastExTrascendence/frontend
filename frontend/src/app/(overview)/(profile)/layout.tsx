"use client";

import styled from "styled-components";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UserProfilePageStyled>
      <UserProfileContainerStyled>{children}</UserProfileContainerStyled>
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
