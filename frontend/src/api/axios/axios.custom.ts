import axios from "axios";
import instance from "@/api/axios/axios.instance";
import { UserRegisterDataDto } from "@/types/dto/user.dto";
import { GameMode, GameType } from "@/types/enum/game.enum";
import { ChannelPolicy } from "@/types/enum/channel.enum";

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

const axiosCreateGameURL = "/game/create";
export const axiosCreateGame = async (
  title: string,
  channelPolicy: ChannelPolicy,
  password: string | null,
  creator: number,
  type: GameType,
  mode: GameMode,
): Promise<any> => {
  try {
    const response = await instance.post(axiosCreateGameURL, {
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
