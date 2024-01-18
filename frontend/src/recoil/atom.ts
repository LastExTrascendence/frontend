import { atom } from "recoil";
import { UserStatus } from "@/types/enum/user.enum";
import { IToastInfo } from "@/types/interface/toast.interface";
import { UserInfoDto } from "@/types/interface/user.interface";

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
export const myState = atom<UserInfoDto>({
  key: "myInfo",
  default: {
    id: 1,
    nickname: "default",
    avatar:
      "https://cdn.intra.42.fr/users/684b78b28e8b79779609c8ed0def0ebe/chanheki.jpg",
    status: UserStatus.ONLINE,
  },
});
