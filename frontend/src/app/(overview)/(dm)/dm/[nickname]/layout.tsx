"use client";

import styled from "styled-components";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DMPageStyled>
      <DMContainerStyled>{children}</DMContainerStyled>
    </DMPageStyled>
  );
}

const DMPageStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const DMContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 50px);
  height: calc(100% - 50px);
  border-radius: 20px;
  background-color: var(--gray);

  @media (max-width: 610px) {
    width: calc(100%);
    height: calc(100%);
    border-radius: 0;
  }
`;
