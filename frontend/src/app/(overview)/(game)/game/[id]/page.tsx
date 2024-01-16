"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";

import { useState, useEffect, useRef, use } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { myState } from "@/recoil/atom";

import { Message, ChatAttendees } from "@/types/interface/chat.interface";
import { useGameSocket } from "@/components/GameSocketProvider";
import useChannelListener from "@/hooks/useChannelListener";
import useUserListListener from "@/hooks/useUserListListener";
import useUserListComposer from "@/hooks/useUserListComposer";
import useGameChannelHandler from "@/hooks/useGameChannelHandler";
import useGameEnter from "@/hooks/useGameEnter";

import getAdminIcon from "@/ui/overview/channel/get-admin-icon";
import GetRoleIcon from "@/ui/overview/channel/get-role-icon";
import MessageItem from "@/ui/overview/channel/message-item";
import MessageInput from "@/ui/overview/channel/message-input";
import GrowBlank from "@/ui/grow-blank";
import PillButton from "@/ui/pill-button";
import ButtonLeft from "@/ui/button-left";
import ButtonRight from "@/ui/button-right";

import { useMenu } from "@/hooks/useMenu";
import GamePlay from "@/components/games/GamePlay";

export default function Page({ params }: { params: { id: string } }) {
  const myInfo = useRecoilValue(myState);
  const [messages, setMessages] = useState<Message[]>([]);
  const { gameSocket, isGameConnected, setGameId, setUserId } =
    useGameSocket();
  const router = useRouter();
  const [currentMessage, setCurrentMessage] = useState("");
  const [userList, setUserList] = useState<ChatAttendees[]>();
  const [myRole, setMyRole] = useState<string>("USER");
  const messagesEndRef = useRef(null);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isGameStart, setIsGameStart] = useState<boolean>(true);
  const messageRef = useRef("");

  const { closeAll } = useMenu();

  useEffect(() => {

  }, [isGameStart]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage(e);
    }
  };

  const gameStartHandler = () => {
    if (!gameSocket) return;
    if (!isGameConnected) return;
    console.log("gameStartHandler" + myRole);
    if (myRole === "CREATOR") {//&& isReady) {
      console.log("game Start");
      gameSocket.emit("pressStart", { myId: myInfo.id, gameId: params.id, title: name });
    } else {
      console.log("game Ready");
      gameSocket.emit("pressReady", { myId: myInfo.id, gameId: params.id, title: name });
    }
  }

  useEffect(() => {
    if (!gameSocket) return;
    if (isGameConnected) {
      const gameReadyHandler = () => {
        isReady ? setIsReady(false) : setIsReady(true);
      };
      gameSocket.on("readyOn", gameReadyHandler);
      gameSocket.on("readyOff", gameReadyHandler);

      return () => {
        gameSocket.off("readyOn", gameReadyHandler);
        gameSocket.off("readyOff", gameReadyHandler);
      };
    }
  }, [isGameConnected]);

  useEffect(() => {
    if (!gameSocket) return;
    if (isGameConnected) {
      const gameStartRedirect = () => {
        // router.push(`/game/${params.id}/play?id=${params.id}&name=${name}`);
        setIsGameStart(true);
      };
      gameSocket.on("gameStart", gameStartRedirect);

      return () => {
        gameSocket.off("gameStart", gameStartRedirect);
      }
    }
  }, [isGameConnected]);

  useGameChannelHandler(myInfo.id, params.id, setUserId, setGameId);
  useGameEnter(gameSocket, isGameConnected, myInfo.id, name);
  useChannelListener(gameSocket, setMessages);
  useUserListListener(gameSocket, setUserList);
  useUserListComposer(userList, myInfo.nickname, setMyRole);

  const sendMessage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (currentMessage.trim()) {
      gameSocket.emit("msgToServer", {
        time: new Date(),
        title: name,
        sender: myInfo.id,
        content: currentMessage,
      });
      setCurrentMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full w-full items-center justify-center content-center">
      {
        isGameStart &&
        <GamePlay myRole={myRole} id={params.id} />
      }
      <div className="m-12 flex max-h-[1833px] min-h-[400px] w-full min-w-[400px] flex-row content-center items-start">
        <div className="flex h-full w-full flex-col bg-chatColor p-9">
          <div className="w-full content-start items-center overflow-y-scroll">
            {messages.map((message, index) => (
              <MessageItem key={index} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <GrowBlank />
          <MessageInput
            currentMessage={currentMessage}
            setCurrentMessage={setCurrentMessage}
            // messageRef={messageRef}
            handleKeyDown={handleKeyDown}
            sendMessage={sendMessage}
            name={name}
          />
        </div>

        <div className="hidden flex-col h-full min-w-[400px] shrink-0 max-w-[600px] bg-userInfoColor md:block items-start content-center">
          <div className="flex h-full w-full flex-col p-9 ">
            <div className="flex h-[52px] w-full font-['Noto Sans KR'] text-4xl font-normal text-white">
              #{name}
            </div>
            <div className="mt-10 flex flex-col items-center space-y-4 overflow-y-scroll">
              {userList &&
                userList.map((user) => (
                  <div key={user.id} className="flex items-center space-x-4">
                    <Image
                      className={
                        user.role === "CREATOR"
                          ? "h-[35.57px] w-[35.57px] rounded-[32px] border-4 border-indigoColor"
                          : "rounded-full border border-black"
                      }
                      width={36}
                      height={36}
                      src={user.avatar}
                      // src="/default_profile.svg"
                      alt={user.nickname || ""}
                    />

                    <span className="font-['Noto Sans KR'] text-base font-normal text-white">
                      {user.nickname}
                    </span>

                    {myInfo.nickname !== user.nickname &&
                      getAdminIcon({
                        role: myRole,
                        socket: gameSocket,
                        title: name,
                        myId: myInfo.id,
                        user,
                      })}
                  </div>
                ))}
            </div>
            {!isGameStart &&
              < div >
                <GrowBlank />
                <div className="flex flex-col h-[440px] min-h-[440px] w-full min-w-[260px] rounded-[20px] bg-bgGrayColor mb-[35px]">
                  <div className="flex h-[160px] w-full items-center justify-center rounded-r-[20px] mt-12 mb-12">
                    <Image src="/map.svg" alt="basic map" width={240} height={160} />
                  </div>
                  <div className="flex m-2">
                    <div className="grid flex-grow place-items-center text-[28px] font-normal text-white">
                      Mode
                    </div>
                    <ButtonLeft width={30} height={30} onClick={() => { console.log("click"); }} />
                    <div className="grid flex-grow place-items-center text-[28px] font-normal text-white">
                      Normal
                    </div>
                    <ButtonRight width={30} height={30} onClick={() => { console.log("right"); }} />
                  </div>
                  <div className="flex p-2">
                    <div className="grid flex-grow place-items-center text-[28px] font-normal text-white">
                      Type
                    </div>
                    <ButtonLeft width={30} height={30} onClick={() => { console.log("click"); }} />
                    <div className="grid flex-grow place-items-center text-[28px] font-normal text-white">
                      Original
                    </div>

                    <ButtonRight width={30} height={30} onClick={() => { console.log("right"); }} />
                  </div>
                  <div className="flex p-2">
                    <div className="grid flex-grow place-items-center text-[28px] font-normal text-white">
                      Speed
                    </div>
                    <ButtonLeft width={30} height={30} onClick={() => { console.log("click"); }} />
                    <div className="grid flex-grow place-items-center text-[28px] font-normal text-white">
                      150%
                    </div>
                    <ButtonRight width={30} height={30} onClick={() => { console.log("right"); }} />
                  </div>
                </div>
                <PillButton width="320px" height="100px" theme="purple" fontSize="3rem" fontStyle="extra-bold" text={myRole === "CREATOR" ? "Start" : "Ready"} onClick={gameStartHandler} />
                {/* <PillButton width="320px" height="100px" theme="purple" fontSize="3rem" fontStyle="extra-bold" text={myRole === "CREATOR" ? "Start" : "Ready"} onClick={() => { router.push(`/game/${params.id}/play?id=${params.id}&name=${name}`); }} /> */}
              </div>}
          </div>
        </div>
      </div>
    </div >
  );
}
