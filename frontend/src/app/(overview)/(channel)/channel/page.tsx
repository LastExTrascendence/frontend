"use client";

import React, { useState } from "react";
import Search from "@/components/SearchChannel";
import chats from "@/lib/chat-data";
import Modal from "@/components/Modal";

export default function Page() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="flex h-full w-full scroll-m-0 flex-col">
      <div className="flex h-[50px] flex-row">
        <Search placeholder="Search channels" />
        <button
          type="button"
          className="bg-buttonColor h-full w-48 rounded-[30px]"
          onClick={toggleModal}
        >
          NEW
        </button>
      </div>

      <div className="flex flex-row">
        <p>Channel</p>
        <p>Creator</p>
        <p>Users</p>
        <p>Type</p>
      </div>
      <div>
        {chats.map((chat) => (
          <div className="flex flex-row">
            <p>{chat.channel}</p>
            <p>{chat.creator}</p>
            <p>{chat.users}</p>
            <p>{chat.type}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <Modal onClose={toggleModal}>
          <form className="flex flex-col">
            <label>
              Channel
              <input
                type="text"
                name="channel"
                className="bg-gray-800 text-center"
              />
            </label>
            {/* <label>
              Creator
              <input type="text" name="creator" className="bg-gray-800" />
            </label> */}
            <label>
              Users
              <input
                type="number"
                name="users"
                className="bg-gray-800 text-center"
              />
            </label>
            <label>
              Type
              <input
                type="text"
                name="type"
                className="bg-gray-800 text-center"
              />
            </label>
            <button type="submit">Submit</button>
          </form>
        </Modal>
      )}
    </div>
  );
}
