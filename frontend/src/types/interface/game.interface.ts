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
  nickname: string;
  gameUserRole: GameResult;
  gameType: GameType;
  gmaeMode: GameMode;
  date: Date;
}

export type GameStatsResponseDto =
  | GameStatsDto
  | undefined
  | typeof STATUS_400_BAD_REQUEST;

export interface GameStatsDto {
  longestGame: number;
  shortestGame: number;
  averageGameTime: number;
  totalPointScored: number;
  averageScorePerGame: number;
  averageScorePerWin: number;
}

/**
 * @description canvas에 그려질 요소들
 * @param {string} map - 배경 이미지
 * @param {number} width - 캔버스 너비
 * @param {number} height - 캔버스 높이
 */
export interface CanvasProps {
  map: string;
  width: number;
  height: number;
}

/**
 * @description 게임에 필요한 요소들
 * @extends {CanvasProps} CanvasProps
 * @param {BallProps} ball - 공
 * @param {PaddleProps} leftPaddle - 왼쪽 패들
 * @param {PaddleProps} rightPaddle - 오른쪽 패들
 */
export interface GameProps extends CanvasProps {
  ball: BallProps;
  leftPaddle: PaddleProps;
  rightPaddle: PaddleProps;
}

/**
 * @description 게임에 필요한 요소들
 * @param {number} x - x 좌표
 * @param {number} y - y 좌표
 */
export interface BallProps {
  x: number;
  y: number;
  size: number;
}

/**
 * @description 게임에 필요한 요소들
 * @param {number} x - x 좌표
 * @param {number} y - y 좌표
 * @param {number} width - 너비
 * @param {number} height - 높이
 * @param {string} color - 색상
 */
export interface PaddleProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

/**
 * @description 게임 끝날때 필요한 요소들
 * @param {string} winUserNick - 승리한 유저 닉네임
 * @param {string} loseUserNick - 패배한 유저 닉네임
 * @param {string} playTime - 플레이 시간
 * @param {string} homeScore - 홈팀 점수
 * @param {string} awayScore - 어웨이팀 점수
 */
export interface GameEndData {
  winUserNick: string;
  loseUserNick: string;
  playTime: string;
  homeScore: string;
  awayScore: string;
}
