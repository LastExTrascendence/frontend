import { UserStatus } from "@/types/enum/user.enum";

const followlist = [
  {
    id: 1,
    nickname: "chanheki",
    online: true,
    status: UserStatus.ONLINE,
    avatar:
      "https://cdn.intra.42.fr/users/684b78b28e8b79779609c8ed0def0ebe/chanheki.jpg",
  },
  {
    id: 2,
    nickname: "jusohn",
    online: false,
    status: UserStatus.OFFLINE,
    avatar:
      "https://cdn.intra.42.fr/users/fb8b902792cf615d5cefb923a6a49005/jusohn.jpg",
  },
  {
    id: 3,
    nickname: "miyu",
    online: true,
    status: UserStatus.ONLINE,
    avatar:
      "https://cdn.intra.42.fr/users/d3fb80307654a92ffac801145e5de903/miyu.jpg",
  },
  {
    id: 4,
    nickname: "yeomin",
    online: true,
    status: UserStatus.ONLINE,
    avatar:
      "https://cdn.intra.42.fr/users/2586d16b83aa0f9427e139285783121a/yeomin.jpg",
  },
  {
    id: 5,
    nickname: "jaeyojun",
    online: false,
    status: UserStatus.OFFLINE,
    avatar:
      "https://cdn.intra.42.fr/users/c9852e0e0f875b95ed78b845660bed11/jaeyojun.jpg",
  },
];

export default followlist;
