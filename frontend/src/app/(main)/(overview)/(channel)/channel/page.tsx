"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import NewChatChannelModal from "@/components/Modals/NewChatChannelModal/NewChatChannelModal";
import ChannelList from "@/ui/overview/channel/channel-list";
import PillButton from "@/ui/pill-button";
import { STATUS_400_BAD_REQUEST } from "@/types/constants/status-code";
import { ChannelListResponseDto } from "@/types/interface/channel.interface";
import { axiosGetChatChannels } from "@/api/axios/axios.custom";

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
  font-size: 1.25rem;
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

export default function Page() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [chatChannelList, setChatChannelList] =
    useState<ChannelListResponseDto>(undefined);
  const [showNewChatChannelModal, setShowNewChannelModal] =
    useState<boolean>(false);
  const [filteredChatChannelList, setFilteredChatChannelList] =
    useState<ChannelListResponseDto>(chatChannelList);
  const { t } = useTranslation("channel");

  const getChatChannels = async () => {
    try {
      const response = await axiosGetChatChannels()
        .then((res) => {
          setTimeout(() => {
            setChatChannelList(res.data);
          }, 500);
        })
        .catch((err) => {
          setTimeout(() => {
            setChatChannelList(STATUS_400_BAD_REQUEST);
          }, 500);
        });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    getChatChannels();
  }, []);

  useEffect(() => {
    if (!searchInput) {
      setFilteredChatChannelList(chatChannelList);
      return;
    }

    const filtered = chatChannelList?.filter((channel: { title: string }) =>
      channel.title.toLowerCase().includes(searchInput.toLowerCase()),
    );

    setFilteredChatChannelList(filtered);
  }, [searchInput, chatChannelList]);

  const toggleNewChannelModal = () => {
    setShowNewChannelModal(!showNewChatChannelModal);
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
              placeholder={t("searchChannels")}
              value={searchInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchInput(e.target.value)
              }
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-stone-300 peer-focus:text-gray-900" />
          </SearchBarWrapperStyled>
          <PillButton
            onClick={toggleNewChannelModal}
            text={t("new")}
            width="100px"
            height="35px"
            fontWeight="800"
            fontStyle="italic"
            fontSize="1.5rem"
            theme="purple"
          />
        </TopSectionWrapperStyled>
        <ChatChannelContainerStyled>
          <ChannelList chats={filteredChatChannelList} />
        </ChatChannelContainerStyled>
      </ChannelPageStyled>
      {showNewChatChannelModal && (
        <NewChatChannelModal closeModal={handleCloseNewChannelModal} />
      )}
    </>
  );
}
