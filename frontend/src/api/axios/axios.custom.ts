import { UserRegisterDataDto } from "@/types/dto/user.dto";
import { ChannelPolicy } from "@/types/enum/channel.enum";
import { GameMode, GameType } from "@/types/enum/game.enum";
import { ChatCreateProps } from "@/types/interface/chat.interface";
import instance from "@/api/axios/axios.instance";

const axiosGenerateOTPURL = "/auth/otp/generate";
export const axiosGenerateOTP = async (): Promise<any> => {
  try {
    const response = await instance.post(axiosGenerateOTPURL);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const axiosVerifyOTPURL = "/auth/otp/verify";
export const axiosVerifyOTP = async (otp: string): Promise<any> => {
  try {
    const response = await instance.post(axiosVerifyOTPURL, {
      otp,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const axiosOTPLoginURL = "/auth/otp/login";
export const axiosOTPLogin = async (otp: string): Promise<any> => {
  try {
    const response = await instance.post(axiosOTPLoginURL, {
      otp,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const axiosMyInfoURL = "/user/me";
export const axiosMyInfo = async (): Promise<any> => {
  try {
    const response = await instance.get(axiosMyInfoURL);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const axiosMyProfileURL = "/user/me/profile";
export const axiosMyProfileInfo = async (): Promise<any> => {
  try {
    const response = await instance.get(axiosMyProfileURL);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const axiosUpdateMyProfileURL = "/user/me/update";
export const axiosUpdateMyProfile = async (
  nickname: string,
  avatar: string,
  two_fa: boolean,
  language: string,
): Promise<any> => {
  try {
    const response = await instance.post(axiosUpdateMyProfileURL, {
      nickname,
      avatar,
      two_fa,
      language,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const axiosCreateUserURL = "/user/create";
export const axiosCreateUser = async ({
  nickname,
  avatar,
}: UserRegisterDataDto): Promise<any> => {
  try {
    const response = await instance.post(axiosCreateUserURL, {
      nickname,
      avatar,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const axiosGetUserProfileByNicknameURL = "/user/profile";
export const axiosGetUserProfileByNickname = async (
  nickname: string,
): Promise<any> => {
  try {
    const response = await instance.get(
      `${axiosGetUserProfileByNicknameURL}/${nickname}`,
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const axiosGetSearchResultURL = "/user/search";
export const axiosGetSearchResult = async (nickname: string): Promise<any> => {
  try {
    const response = await instance.get(
      `${axiosGetSearchResultURL}/${nickname}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const axiosGetFriendsURL = "/user/friend";
export const axiosGetFriends = async (): Promise<any> => {
  try {
    const response = await instance.get(axiosGetFriendsURL);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const axiosAddFriendURL = "/user/friend/add";
export const axiosAddFriend = async (nickname: string): Promise<any> => {
  try {
    const response = await instance.post(axiosAddFriendURL, {
      nickname,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const axiosRemoveFriendURL = "/user/friend/remove";
export const axiosRemoveFriend = async (nickname: string): Promise<any> => {
  try {
    const response = await instance.post(axiosRemoveFriendURL, {
      nickname,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const axiosGetUserGameRecordURL = "/game/record";
export const axiosGetUserGameRecord = async (
  nickname: string,
): Promise<any> => {
  try {
    const response = await instance.get(
      `${axiosGetUserGameRecordURL}/${nickname}`,
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const axiosGetUesrGameStatsURL = "/game/stats";
export const axiosGetUserGameStats = async (nickname: string): Promise<any> => {
  try {
    const response = await instance.get(
      `${axiosGetUesrGameStatsURL}/${nickname}`,
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const axiosGetGameChannelsURL = "/game";
export const axiosGetGameChannels = async (): Promise<any> => {
  try {
    const response = await instance.get(axiosGetGameChannelsURL);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const axiosCreateGameChannelURL = "/game/create";
export const axiosCreateGame = async (
  title: string,
  gameChannelPolicy: ChannelPolicy,
  password: string | null,
  creatorId: number,
  gameType: GameType,
  gameMode: GameMode,
): Promise<any> => {
  try {
    const response = await instance.post(axiosCreateGameChannelURL, {
      title,
      gameChannelPolicy,
      password,
      creatorId,
      gameType,
      gameMode,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const axiosPostEnterGameURL = "/game/enter";
export const axiosEnterPrivateGame = async (
  gameId: number,
  password: string | null,
  myInfoId: number,
): Promise<any> => {
  try {
    const response = await instance.post(axiosPostEnterGameURL, {
      gameId,
      password,
      myInfoId,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const axiosGetChatChannelsURL = "/channel";
export const axiosGetChatChannels = async (): Promise<any> => {
  try {
    const response = await instance.get(axiosGetChatChannelsURL);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const axiosCreateChatChannelURL = "/channel/create";
export const axiosCreateChatChannel = async (
  channelData: ChatCreateProps,
): Promise<any> => {
  try {
    const response = await instance.post(
      axiosCreateChatChannelURL,
      channelData,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const axiosPostEnterChannelURL = "/channel/enter";
export const axiosEnterPrivateChannel = async (
  channelId: number,
  password: string | null,
  myInfoId: number,
): Promise<any> => {
  try {
    const response = await instance.post(axiosPostEnterChannelURL, {
      channelId,
      password,
      myInfoId,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
