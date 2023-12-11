import chats from "@/lib/game-data";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-wrap h-screen bg-red-50 ">
      <div className="p-4 bg-blue-50 ">
        <p>main 1...</p>
      </div>

      <div className="flex-1 p-4 bg-green-50 ">
        <p>main 2...</p>
      </div>

      <div className="flex-1 p-4">
        {chats.map((chat) => (
          <button
            key={chat.id}
            // onClick={ -TODO: main }
            className="flex grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <p>Name: {chat.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
