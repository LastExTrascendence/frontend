"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { myState } from "@/recoil/atom";
import { useSocket } from "@/components/SocketProvider";
import UserInfoCard, { UserInfoButtonStyled } from "@/ui/user-info-card";
import {
  UserCardInfoDto,
  UserCardInfoResponseDto,
} from "@/types/interface/user.interface";
import { axiosGetUserProfileByNickname } from "@/api/axios/axios.custom";
import { useMenu } from "@/hooks/useMenu";

interface Message {
  time: string | Date;
  sender: number; // mystate id
  receiver: string; // receiver nickname
  content: string; //
}

export default function DM({ params }: { params: { nickname: string } }) {
  const myInfo = useRecoilValue(myState);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const { socket, isConnected } = useSocket();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [userInfo, setUserInfo] = useState<UserCardInfoResponseDto>(undefined);
  const { openUserInfoCard } = useMenu();

  useEffect(() => {
    let timer: any;
    // TODO : notFound
    if (isConnected) {
      timer = setTimeout(() => {
        notFound();
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isConnected]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    const messageListener = (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };
    socket.emit("getRedis", { sender: myInfo.id, receiver: params.nickname });
    socket.on("msgToClient", messageListener);
    return () => {
      socket.off("msgToClient", messageListener);
    };
  }, [socket, isConnected, myInfo.id]);

  const sendMessage = async (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    const messsage: Message = {
      time: new Date(),
      sender: myInfo.id,
      receiver: params.nickname,
      content: currentMessage,
    };
    socket.emit("msgToServer", messsage);
    setCurrentMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage(e);
    }
  };

  useEffect(() => {
    getUserProfileInfo();
  }, []);

  const getUserProfileInfo = async () => {
    try {
      const { data: userProfileInfo } = await axiosGetUserProfileByNickname(
        params.nickname,
      );
      setTimeout(() => {
        setUserInfo(userProfileInfo);
      }, 300);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DMPageStyled>
      <DMContainerStyled>
        <DMConentContainerStyled className="bg-chatColor">
          <div className="content-start items-center overflow-y-auto">
            <UserInfoButtonStyled
              onClick={() => {
                openUserInfoCard();
              }}
            >
              <Image
                src="/arrow_left.svg"
                alt="UserInfoToggler"
                width={30}
                height={30}
              />
            </UserInfoButtonStyled>
            {messages.map((message, index) => (
              <div
                key={index}
                className="grid grid-cols-[auto_auto_1fr] gap-4 rounded-lg px-2 pb-1 text-base text-white hover:bg-gray-700"
              >
                <span className="max-w-[100px] overflow-hidden">
                  {/* print in HH:MM AM/PM format */}
                  <>{message.time ? message.time : ""} </>
                </span>
                <span className="max-w-[100px] overflow-hidden">
                  {message.sender ? message.sender : ""}
                </span>
                <span>{message.content ? message.content : ""}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="my-2 w-full grow" />

          <div className="flex min-h-[35px] w-full rounded-md bg-chatInputColor shadow-sm">
            <input
              className="placeholder:text-muted-foreground focus-visible:ring-ring border-input focus-visible:false flex-1 rounded-md rounded-l-md bg-transparent p-2 text-sm text-white shadow-sm transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder={`Send message to ${params.nickname}`}
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 rounded-r-md text-sm text-white transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
              onClick={(e) => sendMessage(e)}
            >
              <Image src="/send.svg" alt="SendButton" width={30} height={30} />
            </button>
          </div>
        </DMConentContainerStyled>
        {/* isConnected */}
        <UserInfoCard userInfo={userInfo} />
      </DMContainerStyled>
    </DMPageStyled>
  );
}

const DMPageStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const DMContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 30px);
  height: calc(100%);
  background-color: var(--gray);
  margin: 15px 0;
  border-radius: 20px;

  @media (max-width: 610px) {
    width: calc(100%);
    margin: 0;
    border-radius: 0;
    justify-content: flex-end;
  }
`;

export const DMConentContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  padding: 2.25rem;

  @media (max-width: 610px) {
    width: calc(100% - 15px);
    border-radius: 0;
  }
`;

export const UserInfoCardWrapperStyled = styled.div``;
