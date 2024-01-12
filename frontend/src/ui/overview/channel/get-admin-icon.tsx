import Image from "next/image";
import banUser from "@/api/socket/chat/banUser";
import kickUser from "@/api/socket/chat/kickUser";
import muteUser from "@/api/socket/chat/muteUser";
import { ChatAttendees } from "@/types/interface/chat.interface";
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
  user,
}: GetAdminIconProps) {
  // console.log("admin icon ", role, socket, title, myId, user.nickname);
  switch (role) {
    case "CREATOR":
      return (
        <div className="ml-auto flex">
          {renderButton("/user-mute.svg", "User Mute", () =>
            muteUser(socket, title, myId, user.nickname),
          )}
          {renderButton("/user-kick.svg", "User Kick", () =>
            kickUser(socket, title, myId, user.nickname),
          )}
          {renderButton("/user-block.svg", "User Block", () =>
            banUser(socket, title, myId, user.nickname),
          )}
        </div>
      );

    case "OPERATOR":
      return user.role !== "CREATOR" ? (
        <div className="ml-auto flex">
          {renderButton("/user-mute.svg", "User Mute", () =>
            muteUser(socket, title, myId, user.nickname),
          )}
          {renderButton("/user-kick.svg", "User Kick", () =>
            kickUser(socket, title, myId, user.nickname),
          )}
          {renderButton("/user-block.svg", "User Block", () =>
            banUser(socket, title, myId, user.nickname),
          )}
        </div>
      ) : null;

    case "USER":
    default:
      return null;
  }
}
