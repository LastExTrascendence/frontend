"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { myState } from "@/recoil/atom";
import { useSocket } from "@/components/SocketProvider";
import UserInfoCard, { UserInfoButtonStyled } from "@/ui/user-info-card";
import { UserCardInfoResponseDto } from "@/types/interface/user.interface";
import { axiosGetUserProfileByNickname } from "@/api/axios/axios.custom";
import { useMenu } from "@/hooks/useMenu";
import { Message } from "@/types/interface/dm.interface"

export default function DM({ params }: { params: { nickname: string } }) {
  const myInfo = useRecoilValue(myState);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const { socket, isConnected } = useSocket();
  const messagesContainerRef = useRef<null | HTMLDivElement>(null);
  const [userInfo, setUserInfo] = useState<UserCardInfoResponseDto>(undefined);
  const { openUserInfoCard } = useMenu();
  const [updateUserInfo, setUpdateUserInfo] = useState<boolean>(true);

  useEffect(() => {
    if (updateUserInfo) {
      getUserProfileInfo();
      setUpdateUserInfo(false);
    }
  }, [updateUserInfo]);

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

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

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
    <>
      <DMPageContainerStyled>
        <DMPageContentWrapperStyled>
          <DMAreaStyled className="bg-chatColor">
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
            <DMHistoryContainerStyled ref={messagesContainerRef}>
              {messages.map((message, index) => (
                <DMContentStyled key={index}>
                  <TimeStampStyled>
                    <>{message.time ? message.time : ""}</>
                  </TimeStampStyled>
                  <SenderStyled>
                    <>{message.sender ? message.sender : ""}</>
                  </SenderStyled>
                  <MessageStyled>
                    <>{message.content ? message.content : ""}</>
                  </MessageStyled>
                </DMContentStyled>
              ))}
            </DMHistoryContainerStyled>
            <InputMessageContainerStyled>
              <InputMessageStyled
                type="text"
                placeholder={`Send message to ${params.nickname}`}
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 rounded-r-md text-sm text-white transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 p-1"
                onClick={(e) => sendMessage(e)}
              >
                <Image
                  src="/send.svg"
                  alt="SendButton"
                  width={30}
                  height={30}
                />
              </button>
            </InputMessageContainerStyled>
          </DMAreaStyled>
          <UserInfoCard
            userInfo={userInfo}
            updateUserInfo={setUpdateUserInfo}
          />
        </DMPageContentWrapperStyled>
      </DMPageContainerStyled>
    </>
  );
}

const DMPageContainerStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const DMPageContentWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100%);
  height: calc(100%);
  background-color: var(--gray);
  border-radius: 20px;

  @media (max-width: 610px) {
    width: calc(100%);
    height: calc(100%);
    margin: 0;
    border-radius: 0;
    justify-content: flex-end;
  }
`;

export const DMAreaStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  padding: 1rem;

  @media (max-width: 610px) {
    border-radius: 0;
  }
`;

const DMHistoryContainerStyled = styled.div`
  overflow-y: auto;
  width: 100%;
  height: 100%;
`;

const DMContentStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 0.3rem;
`;

const TimeStampStyled = styled.div`
  font-size: 0.7rem;
  color: var(--line-color-light-gray);
  min-width: 50px;
  margin-right: 0.5rem;
`;

const SenderStyled = styled.div`
  font-size: 0.8rem;
  color: var(--light-gray);
  margin-right: 0.5rem;
`;

const MessageStyled = styled.div`
  font-size: 1rem;
  color: var(--white);
  word-break: break-all;
`;

const InputMessageContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 100%;
  border-radius: 10px;
  margin: 1rem 0;
  background-color: var(--chatInputColor);
`;

const InputMessageStyled = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 0 1rem;
  background-color: var(--chatInputColor);
  color: var(--white);
`;

export const UserInfoCardWrapperStyled = styled.div``;
