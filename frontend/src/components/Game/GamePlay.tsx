"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useGameSocket } from "@/components/GameSocketProvider";
import DrawGame from "@/ui/overview/game/draw-game";
import { GameDataProps, PlayInfoProps } from "@/types/type/game-socket.type";
import useGameKeyHandler from "@/hooks/useGameKeyHandler";
import useGameTouchHandler from "@/hooks/useGameTouchHandler";

const renderTime = ({ remainingTime }) => {
  const currentTime = useRef(remainingTime);
  const prevTime = useRef(null);
  const isNewTimeFirstTick = useRef(false);
  const [, setOneLastRerender] = useState(0);

  if (currentTime.current !== remainingTime) {
    isNewTimeFirstTick.current = true;
    prevTime.current = currentTime.current;
    currentTime.current = remainingTime;
  } else {
    isNewTimeFirstTick.current = false;
  }

  // force one last re-render when the time is over to tirgger the last animation
  if (remainingTime === 0) {
    setTimeout(() => {
      setOneLastRerender((val) => val + 1);
    }, 20);
  }

  const isTimeUp = isNewTimeFirstTick.current;

  return (
    <div className="time-wrapper">
      <div key={remainingTime} className={`time ${isTimeUp ? "up" : ""}`}>
        {remainingTime}
      </div>
      {prevTime.current !== null && (
        <div
          key={prevTime.current}
          className={`time ${!isTimeUp ? "down" : ""}`}
        >
          {prevTime.current}
        </div>
      )}
    </div>
  );
};

export default function GamePlay({
  myRole,
  id,
  isGameStart,
}: {
  myRole: string;
  id: string;
  isGameStart: boolean;
}) {
  const [score, setScore] = useState<number[]>([0, 0]);
  const [countdown, setCountdown] = useState(3);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const type = searchParams.get("type");
  const { gameSocket, isGameConnected } = useGameSocket();
  const [gameData, setGameData] = useState<GameDataProps>({
    x: 256,
    y: 150,
    l: 100,
    r: 100,
  });
  const [playInfo, setPlayInfo] = useState<PlayInfoProps>({
    width: 512,
    height: 300,
    map: "NORMAL",
    paddleWidth: 20,
    paddleHeight: 100,
    ballSize: 10,
    team: "HOME",
  });

  const infoUpdator = (data: PlayInfoProps) => {
    if (myRole === "USER") {
      setPlayInfo((prevPlayInfo) => ({
        ...prevPlayInfo,
        team: "AWAY",
      }));
    } else {
      setPlayInfo((prevPlayInfo) => ({
        ...prevPlayInfo,
        team: "HOME",
      }));
    }
  }
  useEffect(() => {
    infoUpdator(playInfo);
  }, [myRole]);

  useEffect(() => {
    if (!gameSocket) return;

    const loopGameData = (data: GameDataProps) => {
      setGameData(data);
    };

    if (isGameStart) {
      gameSocket.on("loopGameData", loopGameData);
    } else {
      setGameData({
        x: 256,
        y: 150,
        l: 100,
        r: 100,
      });
      setScore([0, 0]);
      if (countdown === 0)
        setCountdown(3);
    }

    return () => {
      gameSocket.off("loopGameData", loopGameData);
    };
  }, [isGameStart]);

  useEffect(() => {
    let timer;
    if (isGameStart && countdown > 0) {
      // 1초마다 카운트다운 감소
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      gameSocket.emit("loopPosition", { gameId: id, title: name, myRole });
    }
    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [isGameStart, countdown]);

  useEffect(() => {
    if (!gameSocket) return;
    if (isGameConnected) {
      gameSocket.on("score", (gameScore: number[]) => {
        setScore(gameScore);
      });

      return () => {
        gameSocket.off("score");
      };
    }
  }, [gameSocket, isGameConnected]);

  useEffect(() => {
    if (!gameSocket) return;
    if (isGameConnected && isGameStart) {
      const playInfoInitialize = (data: PlayInfoProps) => {
        // setPlayInfo(data);
        infoUpdator(data);
      };
      gameSocket.emit("play", { title: name, gameId: id });
      gameSocket.on("play", playInfoInitialize);

      return () => {
        gameSocket.off("play", playInfoInitialize);
      };
    }
  }, [gameSocket, isGameConnected, isGameStart]);

  useGameKeyHandler(gameSocket, id, playInfo.team, type);
  useGameTouchHandler(gameSocket, id, playInfo.team, type);

  return (
    <div className="relative min-w-[512px] min-h-[300px] items-center justify-center p-2 ">
      <div className="h-[45px] left-0 z-3 flex w-full justify-center">
        <div className="text-white text-4xl">
          {score[0]} {" : "} {score[1]}
        </div>
      </div>
      <DrawGame playInfo={playInfo} gameData={gameData} />
      {countdown > 0 && isGameStart && (
        <div className="absolute top-0 left-0 z-4 flex w-full h-full items-center justify-center bg-black bg-opacity-90 rounded-lg ">
          <div className="timer-wrapper text-white text-6xl">
            <CountdownCircleTimer
              isPlaying
              duration={3}
              colors={["#5849b6", "#827baf", "#A30000", "#A30000"]}
              colorsTime={[3, 2, 1, 0]}
            >
              {renderTime}
            </CountdownCircleTimer>
          </div>
        </div>
      )}
    </div>
  );
}
