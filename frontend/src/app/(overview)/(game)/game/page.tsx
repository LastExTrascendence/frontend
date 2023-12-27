"use client";

import { useState } from "react";
import games from "@/lib/game-data.js";
import SearchGame from "@/ui/overview/game/search-game";

import Modal from "@/components/Modal";
import NewGame from "@/ui/overview/game/new-game";
import NewGameButton from "@/ui/overview/game/new-game-button";
import GameList from "@/ui/overview/game/game-list";
import JoinGame from "@/ui/overview/game/join-game";
import PillButton from "@/ui/pill-button";
import styled from "styled-components";

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const toggleJoinGameModal = (chat: any) => {
    setSelectedChat(chat);
  };

  const toggleNewGameModal = () => {
    setShowModal(!showModal);
  };

  return (
    <GamePageStyled>
      <TopSectionWrapperStyled>
        <SearchGame placeholder="Search games" />
        <NewGameButton toggleModal={toggleNewGameModal} />
      </TopSectionWrapperStyled>
      <GamePageContainerStyled>
        <GameList games={games} openModal={toggleJoinGameModal} />
        {selectedChat && (
          <Modal onClose={() => setSelectedChat(null)}>
            <JoinGame selectedChat={selectedChat} />
          </Modal>
        )}
        {showModal && (
          <Modal onClose={toggleNewGameModal}>
            <NewGame onClose={toggleNewGameModal} />
          </Modal>
        )}
      </GamePageContainerStyled>
    </GamePageStyled>
  );
}

const GamePageStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TopSectionWrapperStyled = styled.div`
  width: calc(100% - 50px);
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

const GamePageContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 50px);
  height: calc(100% - 50px);
  border-radius: 20px;
  background-color: var(--gray);
`;
