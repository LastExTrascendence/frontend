"use client";

import { useEffect, useRef } from 'react';


type CanvasProps = {
  map: string;
  width: number;
  height: number;
};

const canvasPropsDefault: CanvasProps = {
  map: '/map.svg',
  width: 1024,
  height: 600,
};

type BallProps = {
  x: number;
  y: number;
  dx: number;
  dy: number;
};

const ballPropsDefault: BallProps = {
  x: canvasPropsDefault.width / 2,
  y: canvasPropsDefault.height - 20,
  dx: 7,
  dy: -7,
};

type PaddleProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
};

// const leftPaddleProps: PaddleProps = {
//   x: 10,
//   y: canvasPropsDefault.height / 2 - 50,
//   width: 10,
//   height: 100,
//   color: '#0000FF',
// };

// const rightPaddleProps: PaddleProps = {
//   x: canvasPropsDefault.width - 20,
//   y: canvasPropsDefault.height / 2 - 50,
//   width: 10,
//   height: 100,
//   color: '#FF0000',
// };

function useCanvasAnimation(canvasRef: React.RefObject<HTMLCanvasElement>, width: number, height: number) {
  const rootStyle = getComputedStyle(document.documentElement);
  const mainDarkPurple = rootStyle.getPropertyValue('--main-dark-purple').trim() || '#827baf';

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (canvas && context) {
      const dpi = window.devicePixelRatio;
      canvas.width = width * dpi;
      canvas.height = height * dpi;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.scale(dpi, dpi);
      console.log('canvas', canvas.style.width, canvas.style.width);

      let { dx, dy } = ballPropsDefault;
      let x = width / 2;
      let y = height - 20;

      const leftPaddleProps: PaddleProps = {
        x: 10,
        y: height / 2 - 50,
        width: 10,
        height: 100,
        color: '#0000FF',
      };

      const rightPaddleProps: PaddleProps = {
        x: width - 20,
        y: height / 2 - 50,
        width: 10,
        height: 100,
        color: '#FF0000',
      };

      const resetBall = () => {
        // 공을 초기 위치로 리셋
        x = width / 2;
        y = height - 20;
        dx = 7;
        dy = -7;
      };

      const drawPaddle = (paddle: PaddleProps) => {
        context.beginPath();
        context.rect(paddle.x, paddle.y, paddle.width, paddle.height);
        context.fillStyle = paddle.color;
        context.fill();
        context.closePath();
      };

      const drawBall = () => {
        context.beginPath();
        context.arc(x, y, 10, 0, Math.PI * 2); // DPI 적용 없이 공의 크기 고정
        context.fillStyle = mainDarkPurple;
        context.fill();
        context.closePath();
      };

      let leftPaddleSpeed = 0;
      let rightPaddleSpeed = 0;
      const paddleSpeed = 7;

      const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
          case 'w':
            leftPaddleSpeed = -paddleSpeed;
            break;
          case 's':
            leftPaddleSpeed = paddleSpeed;
            break;
          case 'ArrowUp':
            rightPaddleSpeed = -paddleSpeed;
            break;
          case 'ArrowDown':
            rightPaddleSpeed = paddleSpeed;
            break;
          default:
            break;
        }
      };

      const handleKeyUp = (event: KeyboardEvent) => {
        switch (event.key) {
          case 'w':
          case 's':
            leftPaddleSpeed = 0;
            break;
          case 'ArrowUp':
          case 'ArrowDown':
            rightPaddleSpeed = 0;
            break;
          default:
            break;
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);

      const draw = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();

        leftPaddleProps.y = Math.max(0, Math.min(leftPaddleProps.y + leftPaddleSpeed, height - leftPaddleProps.height));
        rightPaddleProps.y = Math.max(0, Math.min(rightPaddleProps.y + rightPaddleSpeed, height - rightPaddleProps.height));

        // 패들 충돌 감지
        if (x + dx > rightPaddleProps.x && y > rightPaddleProps.y && y < rightPaddleProps.y + rightPaddleProps.height) {
          dx = -dx;
        } else if (x + dx < leftPaddleProps.x + leftPaddleProps.width && y > leftPaddleProps.y && y < leftPaddleProps.y + leftPaddleProps.height) {
          dx = -dx;
        }

        // 공이 캔버스 경계를 넘어간 경우
        if (x + dx > width) {
          console.log('left win');
          resetBall();
        } else if (x + dx < 0) {
          console.log('right win');
          resetBall();
        }

        if (y + dy > height || y + dy < 0) {
          dy = -dy;
        }

        x += dx;
        y += dy;

        drawPaddle(leftPaddleProps);
        drawPaddle(rightPaddleProps);
      };

      const animate = () => {
        requestAnimationFrame(animate);
        draw();
      };

      animate();

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
      };
    }
  }, [width, height]);
}

export default function DrawGame({ width, height }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // useCanvasAnimation(canvasRef, canvasPropsDefault.width, canvasPropsDefault.height);
  useCanvasAnimation(canvasRef, width / 2, height / 3);

  return (
    <canvas
      ref={canvasRef}
      width={width / 2}
      height={height / 3}
      // width={canvasPropsDefault.width}
      // height={canvasPropsDefault.height}
      style={{
        background: `url(${canvasPropsDefault.map}) no-repeat center center`,
        backgroundSize: 'cover'
      }}
    />
  );
}
