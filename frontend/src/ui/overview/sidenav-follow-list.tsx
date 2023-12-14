import Link from "next/link";
import Image from "next/image";

const followlist = [
  {
    id: "chanheki",
    online: true,
    status: "Quickly match 1:1 games.",
    profile:
      "https://cdn.intra.42.fr/users/684b78b28e8b79779609c8ed0def0ebe/chanheki.jpg",
  },
  {
    id: "jusohn",
    online: false,
    status: "juju",
    profile:
      "https://cdn.intra.42.fr/users/fb8b902792cf615d5cefb923a6a49005/jusohn.jpg",
  },
  {
    id: "miyu",
    online: true,
    status: "mymy",
    profile:
      "https://cdn.intra.42.fr/users/d3fb80307654a92ffac801145e5de903/miyu.jpg",
  },
  {
    id: "yeomin",
    online: true,
    status: "yamyam",
    profile:
      "https://cdn.intra.42.fr/users/2586d16b83aa0f9427e139285783121a/yeomin.jpg",
  },
  {
    id: "jaeyojun",
    online: false,
    status: "jaeyo",
    profile:
      "https://cdn.intra.42.fr/users/c9852e0e0f875b95ed78b845660bed11/jaeyojun.jpg",
  },
];

export default function SideNavFollowList() {
  // nextjs에서 fetch를 사용해서 follow list를 가져온다.
  // const followList = fetch();
  const followList = followlist;

  return (
    <>
      <div className="w-[300px] h-[100px] bg-zinc-800 border-b-2 border-zinc-600">
        <p className="w-[108px] h-[45px] text-white text-5xl font-bold font-['Sansation']">
          L.E.T
        </p>
      </div>
      <div className="flex flex-col">
        <p>Online</p>
        {followList.map((user) => {
          return (
            <Link key={user.id} href={`/user/${user.id}`}>
              <div className="flex w-[auto] h-[90px] border-b-2 border-neutral-600">
                <img
                  className="w-[60px] h-[60px] rounded-[32px] justify-center items-center border-black border-opacity-50"
                  src={user.profile}
                />
                <div className="flex w-full justify-center items-center ">
                  <p className="text-white text-2xl font-normal font-['Noto Sans KR']">
                    {user.id}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
