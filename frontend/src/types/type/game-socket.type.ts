import { Dispatch, SetStateAction } from "react";

/**
 * * @description 게임 소켓 연결을 위한 context type
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
