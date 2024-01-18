"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from 'react';
import { useGameSocket } from "@/components/GameSocketProvider";

import DrawGame from "@/ui/overview/game/draw-game";
import gameKeyDown from '@/api/socket/game/gameKeyDown';
import gameKeyUp from '@/api/socket/game/gameKeyUp';

import { GameDataProps, PlayInfoProps } from "@/types/type/game-socket.type";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

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

export default function GamePlay({ myRole, id, isGameStart }: { myRole: string, id: string, isGameStart: boolean }) {
  const [score, setScore] = useState<number[]>([0, 0]);
  const [countdown, setCountdown] = useState(3);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  // const id = searchParams.get("id");
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
    map: 'NORMAL',
    paddleWidth: 20,
    paddleHeight: 100,
    ballSize: 10,
    team: 'HOME',
  });

  useEffect(() => {
    if (myRole === "USER") {
      setPlayInfo(prevPlayInfo => ({
        ...prevPlayInfo,
        team: "AWAY"
      }));
    } else {
      setPlayInfo(prevPlayInfo => ({
        ...prevPlayInfo,
        team: "HOME"
      }));
    }
  }, [myRole]);


  useEffect(() => {
    if (!gameSocket) return;
    if (isGameStart) {

      const loopGameData = (data: GameDataProps) => {
        // console.log(data)
        setGameData(data)
      }
      gameSocket.on("loopGameData", loopGameData);

      return () => {
        gameSocket.off("loopGameData", loopGameData);
      }
    }
  }, [isGameStart]);

  useEffect(() => {
    const activeKeys = new Set();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (activeKeys.has(event.key)) return; // 이미 눌린 키는 무시
      activeKeys.add(event.key);
      switch (event.key) {
        case 'ArrowUp':
          gameKeyDown(gameSocket, playInfo.team, "ArrowUp")
          break;
        case 'ArrowDown':
          gameKeyDown(gameSocket, playInfo.team, "ArrowDown")
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!activeKeys.has(event.key)) return; // 관리되지 않는 키는 무시
      activeKeys.delete(event.key);
      switch (event.key) {
        case 'ArrowUp':
          gameKeyUp(gameSocket, playInfo.team, "ArrowUp")
          break;
        case 'ArrowDown':
          gameKeyUp(gameSocket, playInfo.team, "ArrowDown")
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameSocket, playInfo.team]);

  useEffect(() => {
    let timer;
    if (isGameStart && countdown > 0) {
      // 1초마다 카운트다운 감소
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      // 카운트다운이 0이 되면 loopPosition 이벤트 발생
      if (myRole === "CREATOR") {
        gameSocket.emit("loopPosition", { gameId: id });
      }
      clearTimeout(timer);
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
  }, [isGameConnected]);

  useEffect(() => {
    if (!gameSocket) return;
    if (isGameConnected) {
      const playInfoInitialize = (data: PlayInfoProps) => {
        setPlayInfo(data)
      }
      gameSocket.emit("play", { title: name, gameId: id });
      gameSocket.on("play", playInfoInitialize);

      return () => {
        gameSocket.off("play", playInfoInitialize);
      }
    }
  }, [isGameConnected]);

  return (
    <div className="relative min-w-[512px] min-h-[300px] items-center justify-center p-12">
      <div className="h-[45px]" />
      <DrawGame playInfo={playInfo} gameData={gameData} />
      <div className="absolute top-[45px] left-0 z-3 flex w-full h-full justify-center">
        <div className="text-white text-4xl">
          {score[0]} {" : "} {score[1]}
        </div>
      </div>
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
      )
      }
    </div >
  );
}
