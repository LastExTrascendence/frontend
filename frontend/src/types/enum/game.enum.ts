/**
 * @description Enum for game types
 * @param {NORMAL} NORMAL - 일반 게임
 * @param {LADDER} LADDER - 래더 (랭크) 게임
 */
export enum GameType {
  NORMAL = "NORMAL",
  LADDER = "LADDER",
  SINGLE = "SINGLE",
}

/**
 * @description Enum for game modes
 * @param {NORMAL} NORMAL - 일반 게임
 * @param {SPEED} SPEED - 스피드 2배 게임
 */
export enum GameMode {
  NORMAL = "NORMAL",
  SPEED = "SPEED",
}

/**
 * @description Enum for game results
 * @param {WIN} WIN - 승리
 * @param {LOSE} LOSE - 패배
 */
export enum GameResult {
  WIN = "WIN",
  LOSE = "LOSE",
}
