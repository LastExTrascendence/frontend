import { useRouter } from "next/navigation";
import {
  CellHeaderStyled,
  CellStyled,
  ChannelListContainerStyled,
  RowStyled,
  TableBody,
  TableHeader,
} from "../game/game-list";

export default function ChannelList({
  chats,
  openModal,
}: {
  chats: any;
  openModal: any;
}) {
  const router = useRouter();
  return (
    <ChannelListContainerStyled>
      <TableHeader>
        <CellHeaderStyled>Channel</CellHeaderStyled>
        <CellHeaderStyled>Creator</CellHeaderStyled>
        <CellHeaderStyled>Users</CellHeaderStyled>
        <CellHeaderStyled>Type</CellHeaderStyled>
      </TableHeader>
      <TableBody>
        {chats.map((chat: any) => (
          <RowStyled
            key={chat.id}
            onClick={() => {
              router.push(`/channel/${chat.id}?name=${chat.channel}`);
            }}
            className="channel"
          >
            <CellStyled>{chat.channel}</CellStyled>
            <CellStyled className="align-center">{chat.creator}</CellStyled>
            <CellStyled className="align-center">{chat.users}</CellStyled>
            <CellStyled className="align-center">{chat.type}</CellStyled>
          </RowStyled>
        ))}
      </TableBody>
    </ChannelListContainerStyled>
  );
}
