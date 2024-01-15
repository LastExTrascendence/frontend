import { Dispatch, SetStateAction } from "react";

/**
 * @description 게임 소켓 연결을 위한 context type
 * @param {any | null} gameSocket - game socket
 * @param {boolean} isGameConnected - game socket 연결 여부
 * @param {Dispatch<SetStateAction<number>>} setGameId - game id state 변경 함수
 * @param {Dispatch<SetStateAction<number>>} setUserId - user id state 변경 함수
 *
 */
export type GameSocketContextType = {
  gameSocket: any | null;
  isGameConnected: boolean;
  setGameId: Dispatch<SetStateAction<number>>;
  setUserId: Dispatch<SetStateAction<number>>;
};

/**
 * @description 게임 Loop에서 사용하는 type
 * @param {number} x - ball x 좌표
 * @param {number} y - ball y 좌표
 * @param {number} l - paddle 왼쪽 y 좌표
 * @param {number} r - paddle 오른쪽 y 좌표
 */
export type GameDataProps = {
  x: number;
  y: number;
  l: number;
  r: number;
};

/**
 * @description 게임 play 초기화시 사용하는 type
 * @param {number} width - 게임 영역 가로 길이
 * @param {number} height - 게임 영역 세로 길이
 * @param {string} map - 게임 배경 이미지
 * @param {number} paddleWidth - paddle 가로 길이
 * @param {number} paddleHeight - paddle 세로 길이
 * @param {number} ballSize - ball 크기
 * @param {string} team - 팀 HOME/AWAY 
 */
export type PlayInfoProps = {
  width: number;
  height: number;
  map: string;
  team: string;
  paddleWidth: number;
  paddleHeight: number;
  ballSize: number;
}
