"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { myState } from "@/recoil/atom";

import { ChatAttendees } from "@/types/interface/chat.interface";
import { useGameSocket } from "@/components/GameSocketProvider";
import useUserListListener from "@/hooks/useUserListListener";
import useUserListComposer from "@/hooks/useUserListComposer";
import useGameChannelHandler from "@/hooks/useGameChannelHandler";
import useGameEnter from "@/hooks/useGameEnter";

import GrowBlank from "@/ui/grow-blank";
import PillButton from "@/ui/pill-button";

import GameChat from "@/ui/overview/game/game-chat";

import { useMenu } from "@/hooks/useMenu";
import GamePlay from "@/components/Game/GamePlay";
import InfoHeader from "@/ui/overview/game/info-header";
import UserList from "@/ui/overview/game/user-list";
import GameInfo from "@/ui/overview/game/game-info";

export default function Page({ params }: { params: { id: string } }) {
  const myInfo = useRecoilValue(myState);
  const [myRole, setMyRole] = useState<string>("USER");
  const [userList, setUserList] = useState<ChatAttendees[]>();
  const { gameSocket, isGameConnected, setGameId, setUserId } =
    useGameSocket();
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isGameStart, setIsGameStart] = useState<boolean>(false);

  const { closeAll } = useMenu();

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
        closeAll();
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

  return (
    <div className="flex flex-col h-full w-full items-center justify-center content-center">
      <div className={`${isGameStart ? "opacity-100 translate-y-0 max-h-[350px]" : "max-h-[0px] opacity-0 translate-y-10"} transition-all duration-1000 ease-in-out z-0 mb-3`}>
        <GamePlay myRole={myRole} id={params.id} isGameStart={isGameStart} />
      </div>
      <div className={`mt-4 transition-margin duration-1000 ease-in-out ${isGameStart ? "mt-8" : "mt-4"} p-12 flex max-h-[1833px] min-h-[700px] w-full min-w-[400px] flex-row content-center items-start z-9`}>
        <GameChat name={name} />
        <div className="hidden flex-col h-full min-w-[400px] shrink-0 max-w-[600px] bg-userInfoColor md:block items-start content-center">
          <div className="flex h-full w-full flex-col p-9 ">
            <InfoHeader name={name} />
            <UserList setMyRole={setMyRole} myRole={myRole} setUserList={setUserList} userList={userList} name={name} />
            <div className={isGameStart ? "hidden" : "flex flex-col "}>
              <GrowBlank />
              <GameInfo isGameStart={isGameStart} />
              <PillButton width="320px" height="100px" theme="purple" fontSize="3rem" fontStyle="extra-bold" text={myRole === "CREATOR" ? "Start" : "Ready"} onClick={gameStartHandler} />
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
