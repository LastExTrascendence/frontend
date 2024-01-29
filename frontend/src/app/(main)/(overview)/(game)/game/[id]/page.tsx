"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { myState } from "@/recoil/atom";
// import { ChannelChatAreaStyled, ChannelInfoButtonStyled } from "../../../(channel)/channel/[id]/page";
import {
  ChannelChatAreaStyled,
  ChannelInfoButtonStyled,
} from "@/app/(main)/(overview)/(channel)/channel/[id]/page";
import GamePlay from "@/components/Game/GamePlay";
import { useGameSocket } from "@/components/GameSocketProvider";
import Modal, { ModalTypes } from "@/components/Modals/Modal";
import ModalPortal from "@/components/Modals/ModalPortal";
import GrowBlank from "@/ui/grow-blank";
import ChannelChat from "@/ui/overview/channel/channel-chat";
import GameChat from "@/ui/overview/game/game-chat";
import GameInfo from "@/ui/overview/game/game-info";
import InfoHeader from "@/ui/overview/game/info-header";
import GameEndModal from "@/ui/overview/game/modal-game-end";
import UserList from "@/ui/overview/game/user-list";
import PillButton from "@/ui/pill-button";
import { GameMode, GameType } from "@/types/enum/game.enum";
import { ChatAttendees } from "@/types/interface/chat.interface";
import {
  GameChannelListDto,
  GameEndData,
} from "@/types/interface/game.interface";
import useGameChannelHandler from "@/hooks/useGameChannelHandler";
import useGameEnter from "@/hooks/useGameEnter";
import useGameInfoListner from "@/hooks/useGameInfoListener";
import { useMenu } from "@/hooks/useMenu";

const gameEndDataMock: GameEndData = {
  winUserNick: "chanheki",
  loseUserNick: "yemoin",
  playTime: "3:30",
  homeScore: "5",
  awayScore: "2",
};

const gameInfoMock: GameChannelListDto = {
  mode: GameMode.NORMAL,
  type: GameType.NORMAL,
};

export default function Page({ params }: { params: { id: string } }) {
  const myInfo = useRecoilValue(myState);
  const [myRole, setMyRole] = useState<string>("USER");
  const [userList, setUserList] = useState<ChatAttendees[]>();
  const { gameSocket, isGameConnected, setGameId, setUserId } = useGameSocket();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const type = searchParams.get("type");
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isGameStart, setIsGameStart] = useState<boolean>(false);
  const [gameEndData, setGameEndData] = useState<GameEndData | null>(
    gameEndDataMock,
  );
  const [showGameEndModal, setShowGameEndModal] = useState(false);
  const [gameInfo, setGameInfo] = useState<GameChannelListDto>(gameInfoMock);

  const { t } = useTranslation("game");
  const { closeAll, openChannelInfoCard } = useMenu();

  const gameStartHandler = () => {
    if (!gameSocket || !isGameConnected) return;
    // console.log("gameStartHandler", myRole, type, isReady);
    if (myRole === "CREATOR" && (type?.toLowerCase() === "single" || isReady)) {
      gameSocket.emit("pressStart", {
        myId: myInfo.id,
        gameId: params.id,
        title: name,
      });
    } else {
      gameSocket.emit("pressReady", {
        myId: myInfo.id,
        gameId: params.id,
        title: name,
      });
    }
  };

  useEffect(() => {
    if (!gameSocket) return;
    if (isGameConnected) {
      const gameReadyOnHandler = () => {
        setIsReady(true);
      };
      const gameReadyOffHandler = () => {
        setIsReady(false);
      };
      gameSocket.on("readyOn", gameReadyOnHandler);
      gameSocket.on("readyOff", gameReadyOffHandler);

      return () => {
        gameSocket.off("readyOn", gameReadyOnHandler);
        gameSocket.off("readyOff", gameReadyOffHandler);
      };
    }
  }, [gameSocket, isGameConnected]);

  useEffect(() => {
    if (!gameSocket) return;
    if (isGameConnected) {
      const gameStartLogic = () => {
        closeAll();
        setIsGameStart(true);
      };
      gameSocket.on("gameStart", gameStartLogic);

      return () => {
        gameSocket.off("gameStart", gameStartLogic);
      };
    }
  }, [gameSocket, isGameConnected]);

  useEffect(() => {
    if (!gameSocket) return;
    const gameEndLogic = (data) => {
      setGameEndData(data);
      setIsGameStart(false);
      setIsReady(false);
      setShowGameEndModal(true);
      gameSocket.emit("gameFinish", { gameId: params.id, title: name });
    };

    if (isGameConnected) {
      gameSocket.on("gameEnd", gameEndLogic);
    }

    return () => {
      gameSocket.off("gameEnd", gameEndLogic);
    };
  }, [gameSocket, isGameConnected]);

  const closeGameEndModal = () => {
    setShowGameEndModal(false);
  };

  useGameInfoListner(gameSocket, isGameConnected, setGameInfo);
  useGameChannelHandler(myInfo.id, params.id, setUserId, setGameId);
  useGameEnter(gameSocket, isGameConnected, myInfo.id, name);

  return (
    <div className="flex flex-col h-full w-full items-center justify-center content-center">
      <div
        className={`relative ${isGameStart
          ? "opacity-100 translate-y-0 max-h-[350px] "
          : "max-h-[0px] opacity-0 translate-y-10"
          } transition-all duration-1000 ease-in-out z-0 mb-3`}
      >
        <GamePlay myRole={myRole} id={params.id} isGameStart={isGameStart} />
      </div>
      <div
        className={`relative mt-4 transition-margin duration-1000 ease-in-out ${isGameStart ? "mt-8 hide-on-small-height max-h-[500px]" : "mt-4"
          } flex h-full w-full min-w-[400px] flex-row content-center items-start z-9`}
      >
        <ChannelChatAreaStyled>
          <ChannelInfoButtonStyled
            onClick={() => {
              openChannelInfoCard();
            }}
          >
            <Image
              src="/arrow_left.svg"
              alt="ChannelInfoToggler"
              width={30}
              height={30}
            />
          </ChannelInfoButtonStyled>
          <GameChat name={name} />
        </ChannelChatAreaStyled>
        <div
          className="flex-col h-full shrink-0 bg-userInfoColor md:block items-start content-center rounded-[20px] p-2 pb-0"
          id="channelInfoCard"
        >
          <div className="flex h-full w-full flex-col p-4 space-y-4">
            <InfoHeader name={name} />
            <UserList
              setMyRole={setMyRole}
              myRole={myRole}
              setUserList={setUserList}
              userList={userList}
              name={name}
              isGameStart={isGameStart}
            />
            <div
              className={
                isGameStart
                  ? "hidden"
                  : "flex flex-col items-center content-center"
              }
            >
              <GameInfo gameInfo={gameInfo} />
              <PillButton
                width="160px"
                height="50px"
                theme={isReady ? "darkpurple" : "purple"}
                fontSize="2.5rem"
                fontWeight="800"
                fontStyle="italic"
                text={myRole === "CREATOR" ? t("start") : t("ready")}
                onClick={gameStartHandler}
              />
            </div>
          </div>
        </div>
      </div>

      {showGameEndModal && (
        <ModalPortal>
          <Modal
            type={ModalTypes.noBtn}
            title="Game Result"
            proceedBtnText="Re Game"
            cancelBtnText="Quit Room"
            closeModal={closeGameEndModal}
          >
            <GameEndModal data={gameEndData} />
          </Modal>
        </ModalPortal>
      )}
    </div>
  );
}
