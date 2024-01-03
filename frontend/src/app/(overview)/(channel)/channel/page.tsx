"use client";

import React, { useState } from "react";
import SearchChannel from "@/ui/overview/channel/search-channel";
import chats from "@/lib/chat-data";
import Modal from "@/components/Modal";
import NewChannel from "@/ui/overview/channel/new-channel";
import NewChannelButton from "@/ui/overview/channel/new-channel-button";
import ChannelList from "@/ui/overview/channel/channel-list";
import JoinChannel from "@/ui/overview/channel/join-channel";

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  const toggleJoinChannelModal = (chat: any) => {
    setSelectedChat(chat);
  };

  const toggleNewChannelModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="bg-gray-60 relative h-full w-full items-center justify-center p-3">
      <div className="flex h-full w-full scroll-m-0 flex-col">
        <div className="flex h-4/5 min-h-[60px] flex-row">
          <SearchChannel placeholder="Search channels" />
          <NewChannelButton toggleModal={toggleNewChannelModal} />
        </div>
        <ChannelList chats={chats} openModal={toggleJoinChannelModal} />
      </div>

      {selectedChat && (
        <Modal onClose={() => setSelectedChat(null)}>
          <JoinChannel selectedChat={selectedChat} />
        </Modal>
      )}

      {showModal && (
        <Modal onClose={toggleNewChannelModal}>
          <NewChannel onClose={toggleNewChannelModal} />
        </Modal>
      )}
    </div>
  );
}
