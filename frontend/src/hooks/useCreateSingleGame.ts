"use client";

import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { myState } from "@/recoil/atom";
import { axiosCreateGame } from "@/api/axios/axios.custom";
import { ChannelPolicy } from "@/types/enum/channel.enum";
import { GameMode, GameType } from "@/types/enum/game.enum";

export default function useCreateSingleGame() {
  const router = useRouter();
  const myInfo = useRecoilValue(myState);

  return async () => {
    try {
      const game = await axiosCreateGame(
        myInfo.nickname,
        ChannelPolicy.PUBLIC,
        null,
        myInfo.id,
        GameType.SINGLE,
        GameMode.NORMAL,
      );
      router.push(`/game/${game.data.id}?name=${myInfo.nickname}&type=single`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}