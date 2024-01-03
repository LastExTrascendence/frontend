import { UserStatus } from "../enum/user.enum";

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
 * @extends {UserDto} UserDto
 * @param {UserStatus} status - 유저 온라인 상태
 */
export interface UserInfoDto extends UserDto {
  status: UserStatus;
}
