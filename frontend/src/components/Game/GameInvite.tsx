"use client";

import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useRecoilValue } from "recoil";
import { myState } from "@/recoil/atom";
import { useSocket } from "@/components/SocketProvider";

export default function GameInvite({ nickname }: { nickname: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { socket, isConnected } = useSocket();
  const iconColor = "var(--light-gray)";
  const myInfo = useRecoilValue(myState);

  const handleInviteClick = () => {
    const currentUrl = `${pathname}?${searchParams}`;

    if (isConnected && socket) {
      socket.emit("gameInvite", {
        userId: myInfo.id,
        inviteUserNick: nickname,
        url: currentUrl,
      });
    }
  };

  return (
    <Image
      src={"/tabletennis.svg"}
      width={40}
      height={40}
      alt="invite game"
      style={{ fill: iconColor }}
      onClick={handleInviteClick}
    />
  );
}
