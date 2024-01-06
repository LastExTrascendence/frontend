import { useRouter } from "next/navigation";
import {
  CellHeaderStyled,
  CellStyled,
  ChannelListContainerStyled,
  RowStyled,
  TableBody,
  TableHeader,
} from "../game/game-list";

export default function ChannelList({ chats }: { chats: any }) {
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
        {chats &&
          chats.map((chat: any) => (
            <RowStyled
              key={chat.id}
              onClick={() => {
                router.push(`/channel/${chat.id}?name=${chat.title}`);
              }}
              className="channel"
            >
              <CellStyled>{chat.title}</CellStyled>
              <CellStyled className="align-center">
                {chat.creator.nickname}
              </CellStyled>
              <CellStyled className="align-center">
                {chat.curUser}/{chat.maxUser}
              </CellStyled>
              <CellStyled className="align-center">
                {chat.channelPolicy.toLowerCase()}
              </CellStyled>
            </RowStyled>
          ))}
      </TableBody>
    </ChannelListContainerStyled>
  );
}
