import { Dispatch, SetStateAction } from "react";

/**
 * * @description 채널 소켓 연결을 위한 context type
 * @param {any | null} channelSocket - channel socket
 * @param {boolean} isChannelConnected - channel socket 연결 여부
 * @param {Dispatch<SetStateAction<number>>} setChannelId - channel id state 변경 함수
 * @param {Dispatch<SetStateAction<number>>} setUserId - user id state 변경 함수
 *
 */
export type ChannelSocketContextType = {
  channelSocket: any | null;
  isChannelConnected: boolean;
  setChannelId: Dispatch<SetStateAction<number>>;
  setUserId: Dispatch<SetStateAction<number>>;
};
