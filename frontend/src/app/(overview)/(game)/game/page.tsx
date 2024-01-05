"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import games from "@/lib/game-data.js";
import SearchGame from "@/ui/overview/game/search-game";
// import Modal from "@/components/Modal";
import NewGame from "@/ui/overview/game/new-game";
import NewGameButton from "@/ui/overview/game/new-game-button";
import GameList from "@/ui/overview/game/game-list";
import JoinGame from "@/ui/overview/game/join-game";
import PillButton from "@/ui/pill-button";
import SearchBar from "@/ui/search-bar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import NewGameModal from "@/ui/Modals/NewGameModal/NewGameModal";
import { GameChannelListDto } from "@/types/interface/game.interface";
import { axiosGetGameChannels } from "@/api/axios/axios.custom";

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [showNewGameModal, setShowNewGameModal] = useState<boolean>(false);
  const [gameChannelList, setGameChannelList] =
    useState<GameChannelListDto[]>();

  useEffect(() => {
    getGameChannels();
  }, []);

  const getGameChannels = async () => {
    try {
      const response = await axiosGetGameChannels()
        .then((res) => {
          setGameChannelList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const toggleJoinGameModal = (chat: any) => {
    setSelectedChat(chat);
  };

  const toggleNewGameModal = () => {
    setShowNewGameModal(!showModal);
  };

  const handleCloseNewGameModal = () => {
    setShowNewGameModal(false);
  };

  return (
    <>
      <GamePageStyled>
        <TopSectionWrapperStyled>
          <SearchBarWrapperStyled>
            <SearchBarStyled
              className="placeholder:text-stone-300"
              placeholder="Search Games"
              value={searchInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchInput(e.target.value)
              }
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-stone-300 peer-focus:text-gray-900" />
          </SearchBarWrapperStyled>
          <PillButton
            onClick={toggleNewGameModal}
            text="New"
            width="100px"
            height="35px"
            fontWeight="800"
            fontStyle="italic"
            fontSize="1.5rem"
            theme="purple"
          />
        </TopSectionWrapperStyled>
        <GameChannelContainerStyled>
          {/* { filteredGames && <GameList games={filteredGames} openModal={toggleJoinGameModal} />} */}
          <GameList games={games} openModal={toggleJoinGameModal} />
        </GameChannelContainerStyled>
      </GamePageStyled>
      {showNewGameModal && (
        <NewGameModal closeModal={handleCloseNewGameModal} />
      )}
      {/* {selectedChat && (
        <Modal onClose={() => setSelectedChat(null)}>
          <JoinGame selectedChat={selectedChat} />
        </Modal>
      )}
      {showModal && (
        <Modal onClose={toggleNewGameModal}>
          <NewGame onClose={toggleNewGameModal} />
        </Modal>
      )} */}
    </>
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
  width: calc(100% - 30px);
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
`;

const SearchBarWrapperStyled = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SearchBarStyled = styled.input`
  width: 260px;
  height: 40px;
  border-radius: 15px;
  background-color: var(--search-bar-color);
  font-size: 1.5rem;
  font-weight: 100;
  color: var(--white);
  outline: none;
  border: none;
  padding-left: 2rem;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
    font-weight: 200;
    width: 160px;
  }
`;

export const GameChannelContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 30px);
  height: calc(100% - 15px - 70px);
  border-radius: 20px;
  background-color: var(--gray);
  margin-bottom: 15px;
`;

const GameChannelHeaderStyled = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: var(--gray); */
  color: var(--white);
  /* border-bottom: 2px solid var(--line-color-gray); */
`;
