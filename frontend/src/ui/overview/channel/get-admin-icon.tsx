import Image from "next/image";
import banUser from "@/api/socket/chat/banUser";
import kickUser from "@/api/socket/chat/kickUser";
import muteUser from "@/api/socket/chat/muteUser";
import changeRole from "@/api/socket/chat/changeRole";

import { GetAdminIconProps } from "@/types/interface/channel.interface";

function renderButton(iconSrc: string, altText: string, onClick: () => void) {
  return (
    <button type="button" className="p-1" onClick={onClick}>
      <Image src={iconSrc} alt={altText} width={18} height={18} />
    </button>
  );
}

export default function getAdminIcon({
  role,
  socket,
  title,
  myId,
  userNickname,
}: GetAdminIconProps) {
  // console.log("admin icon ", role, socket, title, myId, userNickname);
  switch (role) {
    case "CREATOR":
      return (
        <div className="ml-auto flex">
          {renderButton("/user-mute.svg", "User Mute", () =>
            // muteUser(socket, title, myId, userNickname),
            changeRole(socket, title, myId, userNickname),
          )}
          {renderButton("/user-kick.svg", "User Kick", () =>
            kickUser(socket, title, myId, userNickname),
          )}
          {renderButton("/user-block.svg", "User Block", () =>
            banUser(socket, title, myId, userNickname),
          )}
        </div>
      );

    case "OPERATOR":
      return (
        <div className="ml-auto">
          <Image src="/operator.svg" alt="Operator" width={18} height={18} />
        </div>
      );

    case "USER":
    default:
      return null;
  }
}
