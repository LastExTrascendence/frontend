"use client";

import { useEffect, useRef, useMemo } from 'react';
import { PlayInfoProps, GameDataProps } from '@/types/type/game-socket.type';
import { PaddleProps } from '@/types/interface/game.interface';

const canvasPropsDefault: CanvasProps = {
  map: '/map.svg',
  width: 512,
  height: 300,
};

function useCanvasAnimation(canvasRef: React.RefObject<HTMLCanvasElement>, playInfo: PlayInfoProps, gameData: GameDataProps) {
  const rootStyle = getComputedStyle(document.documentElement);
  const mainDarkPurple = rootStyle.getPropertyValue('--main-dark-purple').trim() || '#827baf';
  const gray = rootStyle.getPropertyValue('--gray').trim() || '#2b2d31';
  const white = rootStyle.getPropertyValue('--white').trim() || '#FFFFFF';

  const leftPaddleProps = useMemo(() => ({
    x: 5,
    y: gameData.l,
    width: playInfo.paddleWidth,
    height: playInfo.paddleHeight,
    color: gray,
  }), [gameData.l, playInfo.paddleWidth, playInfo.paddleHeight]);

  const rightPaddleProps = useMemo(() => ({
    x: playInfo.width - playInfo.paddleWidth - 5,
    y: gameData.r,
    width: playInfo.paddleWidth,
    height: playInfo.paddleHeight,
    color: white,
  }), [gameData.r, playInfo.paddleWidth, playInfo.paddleHeight]);

  useEffect(() => {

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) return;
    const dpi = window.devicePixelRatio;
    canvas.width = playInfo.width * dpi;
    canvas.height = playInfo.height * dpi;
    canvas.style.width = `${playInfo.width}px`;
    canvas.style.height = `${playInfo.height}px`;
    context.scale(dpi, dpi);

    const drawPaddle = (paddle: PaddleProps) => {
      context.beginPath();
      context.rect(paddle.x, paddle.y, paddle.width, paddle.height);
      context.fillStyle = paddle.color;
      context.fill();
      context.closePath();
    };

    const drawBall = () => {
      context.beginPath();
      context.arc(gameData.x, gameData.y, playInfo.ballSize, 0, Math.PI * 2); // DPI 적용 없이 공의 크기 고정
      context.fillStyle = mainDarkPurple;
      context.fill();
      context.closePath();
    };

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawBall();
      drawPaddle(leftPaddleProps);
      drawPaddle(rightPaddleProps);
    };

    const animate = () => {
      requestAnimationFrame(animate);
      draw();
    };

    const animationId = requestAnimationFrame(animate);

    // animate();
    setTimeout(() => {
      draw();
    }, 500)

    return () => {
      cancelAnimationFrame(animationId)
    }

  }, [playInfo, gameData, leftPaddleProps, rightPaddleProps]);
}

export default function DrawGame({ playInfo, gameData }: { playInfo: PlayInfoProps, gameData: GameDataProps }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useCanvasAnimation(canvasRef, playInfo, gameData);

  return (
    <canvas
      ref={canvasRef}
      width={playInfo.width}
      height={playInfo.height}
      style={{
        background: `url(${canvasPropsDefault.map}) no-repeat center center`,
        backgroundSize: 'cover'
      }}
    />
  );
}
