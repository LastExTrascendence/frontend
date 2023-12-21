"use client";

import React, { useState } from "react";
import Search from "@/ui/overview/channel/search-channel";
import chats from "@/lib/chat-data";
import Modal from "@/components/Modal";
import NewChannel from "@/ui/overview/channel/new-channel";
import Link from "next/link";

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  const openModal = (chat) => {
    setSelectedChat(chat);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="flex h-full w-full scroll-m-0 flex-col">
      <div className="flex h-[50px] flex-row">
        <Search placeholder="Search channels" />
        <button
          type="button"
          className="h-full w-48 rounded-[30px] bg-buttonColor"
          onClick={toggleModal}
        >
          NEW
        </button>
      </div>
      <div className="h-full w-full rounded-[20px] bg-zinc-800">
        <div className="flex flex-row border-b-2">
          <p className="mr-4 flex-1">Channel</p>
          <p className="mr-4 flex-1">Creator</p>
          <p className="mr-4 flex-1">Users</p>
          <p className="mr-4 flex-1">Type</p>
        </div>
        <div>
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="flex cursor-pointer flex-row border-b-2"
              onClick={() => openModal(chat)}
            >
              <p className="mr-4 flex-1">{chat.channel}</p>
              <p className="mr-4 flex-1">{chat.creator}</p>
              <p className="mr-4 flex-1">{chat.users}</p>
              <p className="mr-4 flex-1">{chat.type}</p>
            </div>
          ))}
        </div>
        {selectedChat && (
          <Modal chat={selectedChat} onClose={() => setSelectedChat(null)}>
            <div className="text-black">
              <p>Channel: {selectedChat.channel}</p>
              <p>Creator: {selectedChat.creator}</p>
              <p>Users: {selectedChat.users}</p>
              <p>Type: {selectedChat.type}</p>
              <Link href={`/channel/${selectedChat.id}`}>Go to Channel</Link>
            </div>
          </Modal>
        )}
      </div>

      {showModal && (
        <Modal onClose={toggleModal}>
          <NewChannel onClose={toggleModal} />
        </Modal>
      )}
    </div>
  );
}
