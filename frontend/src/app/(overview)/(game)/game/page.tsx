"use client";

import { useState } from "react";
import games from "@/lib/game-data.js";
import SearchGame from "@/ui/overview/game/search-game";

import Modal from "@/components/Modal";
import NewGame from "@/ui/overview/game/new-game";
import NewGameButton from "@/ui/overview/game/new-game-button";
import GameList from "@/ui/overview/game/game-list";
import JoinGame from "@/ui/overview/game/join-game";

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  const toggleJoinGameModal = (chat) => {
    setSelectedChat(chat);
  };

  const toggleNewGameModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="bg-gray-60 relative h-full w-full items-center justify-center p-3">
      <div className="flex h-full w-full scroll-m-0 flex-col">
        <div className="flex h-4/5 min-h-[60px] flex-row">
          <SearchGame placeholder="Search games" />
          <NewGameButton toggleModal={toggleNewGameModal} />
        </div>
        <GameList games={games} openModal={toggleJoinGameModal} />
      </div>

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
    </div>
  );
}
