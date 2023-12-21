export default function ChannelList({
  chats,
  openModal,
}: {
  chats: any;
  openModal: any;
}) {
  return (
    <div className="relative mt-3 h-full w-full items-center justify-center rounded-[20px] bg-zinc-800 p-6">
      <div className="flex flex-row items-center justify-center border-b-2">
        <p className="mr-4 flex-1">Channel</p>
        <p className="mr-4 flex-1">Creator</p>
        <p className="mr-4 flex-1">Users</p>
        <p className="mr-4 flex-1">Type</p>
      </div>
      <div>
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="flex min-h-[60px] cursor-pointer flex-row items-center justify-center border-b text-sm md:text-lg"
            onClick={() => openModal(chat)}
          >
            <p className="mr-4 flex-1">{chat.channel}</p>
            <p className="mr-4 flex-1">{chat.creator}</p>
            <p className="mr-4 flex-1">{chat.users}</p>
            <p className="mr-4 flex-1">{chat.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
