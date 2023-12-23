// types/HttpMethod.ts
export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "OPTIONS"
  | "CONNECT"
  | "TRACE";

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

export type MainButtonItemProps = {
  href: string;
  title: string;
  description: string;
};

export type FollowlistProps = {
  id: string;
  online: boolean;
  status: string;
  profile: string;
};

export type UserlistProps = {
  id: string;
  profile: string;
};
