"use client";
import { MainButtonItemProps } from "@/lib/definitions";
import PillButton from "../pill-button";
import styled from "styled-components";

const buttons: MainButtonItemProps[] = [
  {
    href: "/quickstart",
    title: "Quick Start",
    description: "Quickly join queue for 1:1 match",
  },
  {
    href: "/game",
    title: "Game",
    description: "Create or join a game",
  },
  {
    href: "/channel",
    title: "Channel",
    description: "Create or join a channel",
  },
  {
    href: "/profile",
    title: "Profile",
    description: "View or change my settings",
  },
];

function MainButtonList() {
  return (
    <>
      {buttons.map((button) => (
        <ButtonContainer key={button.title}>
          <PillButton
            width="320px"
            height="80px"
            onClick={() => {
              window.location.href = button.href;
            }}
            fontWeight="800"
            fontStyle="italic"
            fontSize="3rem"
            text={button.title}
            theme="purple"
          />
          <ButtonDescriptionStyled>
            {button.description}
          </ButtonDescriptionStyled>
        </ButtonContainer>
      ))}
    </>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;

  @media (min-width: 1920px) {
    margin: 0 3rem;
  }
`;

const ButtonDescriptionStyled = styled.p`
  color: var(--white);
  font-size: 0.75rem;
  font-weight: 300;
  font-style: italic;
  margin-top: 1rem;

  @media (min-width: 1920px) {
    font-size: 1rem;
    font-weight: 400;
  }
`;

export default MainButtonList;
