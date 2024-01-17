"use client";

import { useState } from "react";
import Image from "next/image"

import { useRecoilValue } from "recoil";
import { myState } from "@/recoil/atom";

import { ChatAttendees } from "@/types/interface/chat.interface";
import { useGameSocket } from "@/components/GameSocketProvider";
import useUserListListener from "@/hooks/useUserListListener";
import useUserListComposer from "@/hooks/useUserListComposer";

import getAdminIcon from "@/ui/overview/channel/get-admin-icon";

export default function UserList({ setMyRole, myRole, setUserList, userList, name }: { setMyRole: any, myRole: string, setUserList: any, userList: ChatAttendees[], name: string }) {
  const { gameSocket } = useGameSocket();
  const myInfo = useRecoilValue(myState);

  useUserListListener(gameSocket, setUserList);
  useUserListComposer(userList, myInfo.nickname, setMyRole);

  return (
    <div className="mt-10 flex flex-col items-center space-y-4 overflow-y-scroll">
      {userList &&
        userList.map((user) => (
          <div key={user.id} className="flex items-center space-x-4">
            <Image
              className={
                user.role === "CREATOR"
                  ? "h-[35.57px] w-[35.57px] rounded-[32px] border-4 border-indigoColor"
                  : "rounded-full border border-black"
              }
              width={36}
              height={36}
              src={user.avatar ? user.avatar : "/default_profile.svg"}
              alt={user.nickname + " game profile"}
            />

            <span className="font-['Noto Sans KR'] text-base font-normal text-white">
              {user.nickname}
            </span>

            {myInfo.nickname !== user.nickname &&
              getAdminIcon({
                role: myRole,
                socket: gameSocket,
                title: name,
                myId: myInfo.id,
                user,
              })}
          </div>
        ))}
    </div>
  )
}