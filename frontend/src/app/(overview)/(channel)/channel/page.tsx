import chats from "@/lib/game-data";

export default function Page() {
  return (
    <div className="flex flex-row h-screen">
      {/* 왼쪽 섹션 - 채팅 */}
      <div className="flex-1 p-4 bg-gray-50">
        {/* 여기에 채팅 컴포넌트를 배치합니다 */}
        <p>채팅 내용...</p>
      </div>

      {/* 오른쪽 섹션 - 채팅 목록 */}
      <div className="flex-1 p-4">
        {chats.map((channel) => (
          <button
            key={channel.id}
            // onClick={ -TODO: channel room info modal}

            className="flex grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <p>Name: {channel.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
