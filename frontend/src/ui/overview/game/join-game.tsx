import Link from "next/link";

export default function GameList({ selectedChat }: { selectedChat: any }) {
  return (
    <div className="text-black">
      <p>Game: {selectedChat.name}</p>
      <p>Creator: {selectedChat.join_users[0]}</p>
      <p>Status: {selectedChat.status}</p>
      <p>Map: {selectedChat.map}</p>
      <Link href={`/channel/${selectedChat.id}`}>Go to Game</Link>
    </div>
  );
}
