import { STATUS_400_BAD_REQUEST } from "@/types/constants/status-code";
import { GameMode, GameResult, GameType } from "@/types/enum/game.enum";
import { ChannelDto } from "@/types/interface/channel.interface";

export type GameChannelListResponseDto =
  | GameChannelListDto[]
  | undefined
  | typeof STATUS_400_BAD_REQUEST;

/**
 * @description 게임 채널 리스트
 * @extends {ChannelDto} ChannelDto
 * @param {GameType} type - 게임 타입 (일반, 래더)
 * @param {GameMode} mode - 게임 모드 (노멀, 2배속)
 */
export interface GameChannelListDto extends ChannelDto {
  gameType: GameType;
  gameMode: GameMode;
}

export type GameRecordListResponseDto =
  | GameRecordListDto[]
  | undefined
  | typeof STATUS_400_BAD_REQUEST;

/**
 * @description 프로필에서 표시될 게임 Record 리스트
 * @param {string} player - 플레이어 닉네임
 * @param {GameResult} result - 게임 결과 (승리, 패배)
 * @param {GameType} type - 게임 타입 (일반, 래더)
 * @param {GameMode} mode - 게임 모드 (노멀, 2배속)
 * @param {Date} date - 게임 날짜
 */
export interface GameRecordListDto {
  player: string;
  result: GameResult;
  type: GameType;
  mode: GameMode;
  date: Date;
}
