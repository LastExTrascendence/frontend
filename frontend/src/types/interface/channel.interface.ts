import { STATUS_400_BAD_REQUEST } from "@/types/constants/status-code";
import { ChannelPolicy, ChatChannelUserRole } from "@/types/enum/channel.enum";
import { UserDto } from "@/types/interface/user.interface";
import { ChatAttendees } from "./chat.interface";

export type ChannelListResponseDto =
  | ChatChannelListDto[]
  | undefined
  | typeof STATUS_400_BAD_REQUEST;

/**
 * @description 채널 (게임, 채팅) 정보를 위한 공통 interface
 * @param {string} title - 채널 제목
 * @param {ChannelPolicy} ChannelPolicy - 채널 공개 여부
 * @param {string} password - 채널 비밀번호
 * @param {UserDto} creator - 채널 생성자 정보
 */
export interface ChannelDto {
  title: string;
  channelPolicy: ChannelPolicy;
  password: string | null;
  creator: UserDto;
}

/**
 * @description 채팅 채널 (/channel) 리스트를 위한 interface
 * @extends {ChannelDto} ChannelDto
 * @param {number} curUser - 현재 채널에 접속한 유저 수
 * @param {number} maxUser - 채널 최대 유저 수
 */
export interface ChatChannelListDto extends ChannelDto {
  curUser: number;
  maxUser: number;
}

/**
 * @description 채팅 채널 내 (/channel/id) 개별 유저정보를 위한 interface
 * @param {string} avatar - 유저 아바타 이미지
 * @param {string} nickanme - 유저 닉네임
 * @param {ChatChannelUserRole} role - 유저 권한
 */
export interface ChatChannelUserDto {
  avatar: string; // base64? string?
  nickanme: string;
  role: ChatChannelUserRole;
}

/**
 * @description 채팅 채널 내 (/channel/id) 유저 리스트를 위한 interface
 * @param {string} title - 채널 제목
 * @param {ChannelPolicy} ChannelPolicy - 채널 공개 여부
 * @param {ChatChannelUserDto[]} users - 채널 내 유저 리스트
 */
export interface ChatChannelInfoDto {
  title: string;
  ChannelPolicy: ChannelPolicy;
  users: ChatChannelUserDto[];
}

/**
 * @description 채팅 채널 내 (/channel/id) 유저 리스트를 위한 interface
 * @param {string} title - 채널 제목
 * @param {password} password - 채널 비밀번호
 * @param {nickname} nickname - 유저 닉네임
 */
export interface UserVerify {
  title: string;
  password: string | null;
  nickname: string;
}

export interface GetAdminIconProps {
  role: string;
  socket: any;
  title: string;
  myId: number;
  user: ChatAttendees;
}
