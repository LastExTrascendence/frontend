"use client";

import React, { useEffect, useState } from "react";
import ChannelList from "@/ui/overview/channel/channel-list";
import styled from "styled-components";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import PillButton from "@/ui/pill-button";
import NewChatChannelModal from "@/components/Modals/NewChatChannelModal/NewChatChannelModal";
import { axiosGetChatChannels } from "@/api/axios/axios.custom";
import { ChatChannelListDto } from "@/types/interface/channel.interface";

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [chatChannelList, setChatChannelList] =
    useState<ChatChannelListDto[]>();
  const [showNewChatChannelModal, setShowNewChannelModal] =
    useState<boolean>(false);

  useEffect(() => {
    getChatChannels();
  }, []);

  const getChatChannels = async () => {
    try {
      const response = await axiosGetChatChannels()
        .then((res) => {
          setChatChannelList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const toggleNewChannelModal = () => {
    setShowNewChannelModal(!showModal);
  };

  const handleCloseNewChannelModal = () => {
    setShowNewChannelModal(false);
  };

  return (
    <>
      <ChannelPageStyled>
        <TopSectionWrapperStyled>
          <SearchBarWrapperStyled>
            <SearchBarStyled
              className="placeholder:text-stone-300"
              placeholder="Search Channels"
              value={searchInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchInput(e.target.value)
              }
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-stone-300 peer-focus:text-gray-900" />
          </SearchBarWrapperStyled>
          <PillButton
            onClick={toggleNewChannelModal}
            text="New"
            width="100px"
            height="35px"
            fontWeight="800"
            fontStyle="italic"
            fontSize="1.5rem"
            theme="purple"
          />
        </TopSectionWrapperStyled>
        <ChatChannelContainerStyled>
          <ChannelList chats={chatChannelList} />
        </ChatChannelContainerStyled>
      </ChannelPageStyled>
      {showNewChatChannelModal && (
        <NewChatChannelModal closeModal={handleCloseNewChannelModal} />
      )}
    </>
  );
}

const ChannelPageStyled = styled.div`
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

export const ChatChannelContainerStyled = styled.div`
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
