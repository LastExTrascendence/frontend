export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  following: [string];
  follower: [string];
};

export type Channel = {
  id: string;
  name: string;
  password: string;
  owner_user: string;
  administrators_users: [string];
  mute_users: [string];
  ban_users: [string];
};

export type Game = {
  id: string;
  name: string;
  join_users: [string];
  date: string;
  status: "play" | "wait";
  map: string;
};

export type LinkItemProps = {
  href: string;
  title: string;
  description: string;
};
