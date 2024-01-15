"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from 'react';
import { useGameSocket } from "@/components/GameSocketProvider";
import { useRecoilValue } from "recoil";
import { myState } from "@/recoil/atom";

import DrawGame from "@/ui/overview/game/draw-game";

import { BallProps, PaddleProps } from "@/types/interface/game.interface";

type CanvasProps = {
  map: string;
  width: number;
  height: number;
};

type GameProps = CanvasProps & {
  ball: BallProps;
  leftPaddle: PaddleProps;
  rightPaddle: PaddleProps;
};

type GameDataProps = {
  x: number;
  y: number;
  l: number;
  r: number;
};

type PlayInfoProps = {
  width: number;
  height: number;
  map: string;
  paddleWidth: number;
  paddleHeight: number;
  ballSize: number;
}

export default function Page() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const id = searchParams.get("id");
  const { gameSocket, isGameConnected } = useGameSocket();
  const [gameData, setGameData] = useState<GameDataProps>({
    x: 0,
    y: 0,
    l: 0,
    r: 0,
  });
  const [playInfo, setPlayInfo] = useState<PlayInfoProps>({
    width: 1024,
    height: 600,
    map: 'NORMAL',
    paddleWidth: 20,
    paddleHeight: 100,
    ballSize: 10,
  });

  useEffect(() => {
    if (!gameSocket) return;
    if (isGameConnected) {
      const loopGameData = (data: GameDataProps) => {
        setGameData(data)
      }
      gameSocket.on("loopGameData", loopGameData);
    }
  }, [isGameConnected]);

  useEffect(() => {
    if (!gameSocket) return;
    if (isGameConnected) {
      const playInfoInitialize = (data: PlayInfoProps) => {
        setPlayInfo(data)
      }
      gameSocket.emit("play", { name, gameId: id });
      gameSocket.on("play", playInfoInitialize);

    }
  }, [isGameConnected]);

  return (
    <div className="flex w-full h-full items-center justify-center">
      <DrawGame playInfo={playInfo} gameData={gameData} />
    </div>
  );
}
