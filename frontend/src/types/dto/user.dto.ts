import { STATUS_400_BAD_REQUEST } from "@/types/constants/status-code";
import { UserInfoDto } from "../interface/user.interface";

export interface UserRegisterDataDto {
  nickname: string;
  avatar: string;
}

export interface UserSearchResultDto {
  id: number;
  nickname: string;
  intra_name: string;
  avatar: string;
}

export type UserFriendListResponseDto =
  | UserInfoDto[]
  | typeof STATUS_400_BAD_REQUEST
  | undefined;
