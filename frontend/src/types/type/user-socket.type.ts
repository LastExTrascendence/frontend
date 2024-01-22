/**
 * @description 유저 소켓 연결을 위한 context type
 * @param {any | null} socket - user socket
 * @param {boolean} isConnected - user socket 연결 여부
 * @param {() => void} enterQueue - matching queue에 들어가는 함수
 * @param {() => void} exitQueue - matching queue에서 나오는 함수
 */
export type UserSocketContextType = {
  socket: any | null;
  isConnected: boolean;
  enterQueue: () => void;
  exitQueue: () => void;
};