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

const axiosGetGameChannelsURL = "/game/rooms";
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
  channelPolicy: ChannelPolicy,
  password: string | null,
  creator: number,
  type: GameType,
  mode: GameMode,
): Promise<any> => {
  try {
    const response = await instance.post(axiosCreateGameChannelURL, {
      title,
      channelPolicy,
      password,
      creator,
      type,
      mode,
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
