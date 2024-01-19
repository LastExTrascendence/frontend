import { UserStatus } from "@/types/enum/user.enum";
import { STATUS_400_BAD_REQUEST } from "../constants/status-code";

/**
 * @description UserDto 최소한의 유저 정보를 표시하기 위한 인터페이스
 * @param {number} id - 유저 고유 id
 * @param {string} nickname - 유저 닉네임
 * @param {string} avatar - 유저 아바타
 */
export interface UserDto {
  id: number;
  nickname: string;
  avatar: string;
}

/**
 * @description UserInfoDto 유저의 현재 상태를 표시하기 위한 인터페이스
 * @param {UserStatus} status - 유저 온라인 상태
 * @extends {UserDto} UserDto
 */
export interface UserInfoDto extends UserDto {
  status: UserStatus;
}

export type UserCardInfoResponseDto =
  | UserCardInfoDto
  | undefined
  | typeof STATUS_400_BAD_REQUEST;

/**
 * @description UserCardInfoDto 유저의 프로필 정보를 표시하기 위한 인터페이스
 * @param {string} intra_name - 42 intra name
 * @param {string} email - 이메일
 * @param {UserStatus} status - 온라인 상태
 * @param {boolean} is_friend - 친구 여부
 * @param {Date} at_friend - 친구 추가 날짜 (친구가 아닐 경우 null)
 * @param {number} games - 총 게임 횟수
 * @param {number} wins - 총 승리 횟수
 * @param {number} loses - 총 패배 횟수
 * @extends {UserDto} UserDto
 */
export interface UserCardInfoDto extends UserDto {
  intra_name: string;
  email: string;
  is_friend: boolean;
  at_friend: Date;
  games: number;
  wins: number;
  loses: number;
}
