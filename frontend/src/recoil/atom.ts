import { atom } from "recoil";
import { UserStatus } from "@/types/enum/user.enum";
import { IToastInfo } from "@/types/interface/toast.interface";
import { UserInfoDto } from "@/types/interface/user.interface";

interface ExtendedUserInfoDto extends UserInfoDto {
  beforeUserNick?: string;
}

/**
 * Atom for toast messages
 * @atom toastMessagesState
 * @property {IToastInfo[]} toastMessagesState - array of toast messages
 */
export const toastMessagesState = atom<IToastInfo[]>({
  key: "toastMessages",
  default: [],
});

/**
 * Atom for user info
 * @atom myState
 * @property {UserDto} myState - user info
 */
export const myState = atom<ExtendedUserInfoDto>({
  key: "myInfo",
  default: {
    id: 0,
    nickname: "default",
    avatar:
      "/default_profile.svg",
    status: UserStatus.ONLINE,
    beforeUserNick: "",
  },
});
