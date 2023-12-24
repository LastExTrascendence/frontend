import Link from "next/link";

export default function GameList({ selectedChat }: { selectedChat: any }) {
  return (
    <div className="text-black">
      <p>Game: {selectedChat.channel}</p>
      <p>Creator: {selectedChat.creator}</p>
      <p>Users: {selectedChat.users}</p>
      <p>Type: {selectedChat.type}</p>
      <Link href={`/channel/${selectedChat.id}`}>Go to Game</Link>
    </div>
  );
}
