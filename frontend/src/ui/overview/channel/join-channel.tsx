import Link from "next/link";

export default function ChannelList({ selectedChat }: { selectedChat: any }) {
  return (
    <div className="text-black">
      <p>Channel: {selectedChat.channel}</p>
      <p>Creator: {selectedChat.creator}</p>
      <p>Users: {selectedChat.users}</p>
      <p>Type: {selectedChat.type}</p>
      <Link href={`/channel/${selectedChat.id}?name=${selectedChat.channel}`}>
        Go to Channel
      </Link>
    </div>
  );
}
