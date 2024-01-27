"use client";

import { useTranslation } from "react-i18next";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { myState } from "@/recoil/atom";
import GamePlay from "@/components/Game/GamePlay";
import { useGameSocket } from "@/components/GameSocketProvider";
import GrowBlank from "@/ui/grow-blank";
import GameChat from "@/ui/overview/game/game-chat";
import GameInfo from "@/ui/overview/game/game-info";
import InfoHeader from "@/ui/overview/game/info-header";
import UserList from "@/ui/overview/game/user-list";
import PillButton from "@/ui/pill-button";
import { ChatAttendees } from "@/types/interface/chat.interface";
import { GameEndData, GameChannelListDto } from "@/types/interface/game.interface";
import useGameChannelHandler from "@/hooks/useGameChannelHandler";
import useGameEnter from "@/hooks/useGameEnter";
import { useMenu } from "@/hooks/useMenu";
import ModalPortal from "@/components/Modals/ModalPortal";
import Modal, { ModalTypes } from "@/components/Modals/Modal";
import GameEndModal from "@/ui/overview/game/modal-game-end";
import useGameInfoListner from "@/hooks/useGameInfoListener";
import { GameMode, GameType } from "@/types/enum/game.enum";

const gameEndDataMock: GameEndData = {
  winUserNick: "chanheki",
  loseUserNick: "yemoin",
  playTime: "3:30",
  homeScore: "5",
  awayScore: "2",
};

const gameInfoMock: GameChannelListDto = {
  mode: GameMode.NORMAL,
  type: GameType.NORMAL
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
  const [gameEndData, setGameEndData] = useState<GameEndData | null>(gameEndDataMock);
  const [showGameEndModal, setShowGameEndModal] = useState(false);
  const [gameInfo, setGameInfo] = useState<GameChannelListDto>(gameInfoMock);

  const { closeAll } = useMenu();
  const { t } = useTranslation("game");

  const gameStartHandler = () => {
    if (!gameSocket || !isGameConnected) return;
    console.log("gameStartHandler", myRole, type, isReady);
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
  }

  useGameInfoListner(gameSocket, isGameConnected, setGameInfo);
  useGameChannelHandler(myInfo.id, params.id, setUserId, setGameId);
  useGameEnter(gameSocket, isGameConnected, myInfo.id, name);

  return (
    <div className="flex flex-col h-full w-full items-center justify-center content-center">
      <div
        className={`relative ${isGameStart
          ? "opacity-100 translate-y-0 max-h-[350px]"
          : "max-h-[0px] opacity-0 translate-y-10"
          } transition-all duration-1000 ease-in-out z-0 mb-3`}
      >
        <GamePlay myRole={myRole} id={params.id} isGameStart={isGameStart} />
      </div>
      <div
        className={`relative mt-4 transition-margin duration-1000 ease-in-out ${isGameStart ? "mt-8" : "mt-4"
          } p-12 flex max-h-[1833px] min-h-[700px] w-full min-w-[400px] flex-row content-center items-start z-9`}
      >
        <GameChat name={name} />
        <div className="hidden flex-col h-full min-w-[400px] shrink-0 max-w-[600px] bg-userInfoColor md:block items-start content-center">
          <div className="flex h-full w-full flex-col p-9 ">
            <InfoHeader name={name} />
            <UserList
              setMyRole={setMyRole}
              myRole={myRole}
              setUserList={setUserList}
              userList={userList}
              name={name}
            />
            <div className={isGameStart ? "hidden" : "flex flex-col "}>
              <GrowBlank />
              <GameInfo gameInfo={gameInfo} />
              <PillButton
                width="320px"
                height="100px"
                theme={isReady ? "darkpurple" : "purple"}
                fontSize="3rem"
                fontStyle="extra-bold"
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
