import user from "@/lib/user-data"
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-wrap h-screen bg-red-50 ">
      <div className="p-4 bg-blue-50 ">
        <p>profile page</p>
      </div>

      <div className="flex-1 p-4 bg-green-50 ">
        <p>name: {user.name}</p>
      </div>

      <div className="flex-1 p-4">
        {user.map(achievement => (
          <button 
            key={achievement.id}
            // onClick={ -TODO: achievement }  
            className="flex grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <p>Name: {achievement.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
