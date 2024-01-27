"use client";

import Image from "next/image";
import { useState } from "react";
import { useChannelSocket } from "@/components/ChannelSocketProvider";
import getAdminIcon from "@/ui/overview/channel/get-admin-icon";
import GetRoleIcon from "@/ui/overview/channel/get-role-icon";
import { ChatAttendees } from "@/types/interface/chat.interface";
import { UserInfoDto } from "@/types/interface/user.interface";
import changeRole from "@/api/socket/chat/changeRole";
import useChannelEnter from "@/hooks/useChannelEnter";
import useUserListComposer from "@/hooks/useUserListComposer";
import useUserListListener from "@/hooks/useUserListListener";

export default function ChannelUserList({
  name,
  myInfo,
}: {
  name: string;
  myInfo: UserInfoDto;
}) {
  const { channelSocket, isChannelConnected } = useChannelSocket();
  const [myRole, setMyRole] = useState<string>("USER");
  const [userList, setUserList] = useState<ChatAttendees[] | null>(null);

  useChannelEnter(channelSocket, isChannelConnected, myInfo.id, name);
  useUserListListener(channelSocket, setUserList);
  useUserListComposer(userList, myInfo.nickname, setMyRole);

  return (
    <div className="mt-4 flex flex-col space-y-4 w-full">
      {userList &&
        userList.map((user) => (
          <div key={user.id + user} className="flex items-center space-x-4">
            <Image
              className={
                user.role === "CREATOR"
                  ? "h-[35.57px] w-[35.57px] rounded-[32px] border-4 border-indigoColor"
                  : "rounded-full border border-black"
              }
              width={36}
              height={36}
              src={user.avatar || "/default_profile.svg"}
              alt={user.nickname || ""}
            />

            <GetRoleIcon
              myRole={myRole}
              userRole={user.role}
              changeRole={() =>
                changeRole(channelSocket, name, myInfo.id, user.nickname)
              }
            />

            <span className="font-['Noto Sans KR'] text-base font-normal text-white">
              {user.nickname}
            </span>

            {myInfo.nickname !== user.nickname &&
              getAdminIcon({
                role: myRole,
                socket: channelSocket,
                title: name,
                myId: myInfo.id,
                user,
              })}
          </div>
        ))}
    </div>
  );
}
