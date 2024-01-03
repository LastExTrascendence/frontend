import { GameMode, GameType } from "../enum/game.enum";
import { ChannelDto } from "./channel.interface";

/**
 * @description 게임 채널 리스트
 * @extends {ChannelDto} ChannelDto
 * @param {GameType} type - 게임 타입 (일반, 래더)
 * @param {GameMode} mode - 게임 모드 (노멀, 2배속)
 */
export interface GameChannelListDto extends ChannelDto {
  type: GameType;
  mode: GameMode;
}
