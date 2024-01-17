"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, use } from 'react';
import { useGameSocket } from "@/components/GameSocketProvider";
import { useRecoilValue } from "recoil";
import { myState } from "@/recoil/atom";

import DrawGame from "@/ui/overview/game/draw-game";
import gameKeyDown from '@/api/socket/game/gameKeyDown';
import gameKeyUp from '@/api/socket/game/gameKeyUp';

import { GameDataProps, PlayInfoProps } from "@/types/type/game-socket.type";

export default function GamePlay({ myRole, id }: { myRole: string, id: string }) {
  const [countdown, setCountdown] = useState(3);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  // const id = searchParams.get("id");
  const { gameSocket, isGameConnected } = useGameSocket();
  const [gameData, setGameData] = useState<GameDataProps>({
    x: 0,
    y: 0,
    l: 0,
    r: 0,
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
    if (isGameConnected) {

      const loopGameData = (data: GameDataProps) => {
        // console.log(data)
        setGameData(data)
      }
      gameSocket.on("loopGameData", loopGameData);

      return () => {
        gameSocket.off("loopGameData", loopGameData);
      }
    }
  }, [isGameConnected]);

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
    if (isGameConnected && countdown > 0) {
      // 1초마다 카운트다운 감소
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      // 카운트다운이 0이 되면 loopPosition 이벤트 발생
      gameSocket.emit("loopPosition", { gameId: id });
    }
    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [isGameConnected, gameSocket, countdown]);

  useEffect(() => {
    if (!gameSocket) return;
    if (isGameConnected) {
      const playInfoInitialize = (data: PlayInfoProps) => {
        setPlayInfo(data)
      }
      gameSocket.emit("play", { title: name, gameId: id });
      gameSocket.on("play", playInfoInitialize);

      gameSocket.emit("loopPosition", { gameId: id });

      return () => {
        gameSocket.off("play", playInfoInitialize);
      }
    }
  }, [isGameConnected]);

  return (
    <div className="flex min-w-[512px] min-h-[300px] max-w-[512px] max-h-[300px] items-center justify-center p-12">
      {countdown < 0 ? (
        // 카운트다운 표시
        <div className="countdown justify-center content-center w-[300px] h-[300px] ">
          <p className="text-6xl text-white">{countdown}</p>
          {/* <Image src={`/${countdown}.png`} width={300} height={300} /> */}
        </div>
        // {countdown}
      ) : (
        // 카운트다운이 0이면 게임 화면 표시
        <DrawGame playInfo={playInfo} gameData={gameData} />
      )
      }
    </div >
  );
}
