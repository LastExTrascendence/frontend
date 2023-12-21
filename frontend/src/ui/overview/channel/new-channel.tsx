"use client";

import { useState } from "react";
import MaximumUser from "@/ui/overview/channel/maximum-user";
import ChannelType from "@/ui/overview/channel/channel-type";

export default function newChannel({ onClose }: { onClose: () => void }) {
  const [userCount, setUserCount] = useState("2");
  const [channelType, setChannelType] = useState("public");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      channel: event.target.channel.value,
      userCount,
      channelType,
      password: event.target.password.value,
    };
    // TODO - send data to backend -> redirection 논의
    onClose();
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex h-full w-full flex-col items-start rounded-lg text-[#827AAF]"
    >
      <label className="relative mb-3 flex flex-col items-start justify-center">
        Channel Name
        <input
          type="text"
          name="channel"
          className="mt-2 rounded bg-buttonColor p-2 text-white focus:bg-violet-400 focus:outline-none focus:ring-2"
        />
      </label>

      <MaximumUser userCount={userCount} setUserCount={setUserCount} />
      <ChannelType channelType={channelType} setChannelType={setChannelType} />

      <button
        type="submit"
        className="hover:bg-modalColor w-full rounded  bg-violet-400 p-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
      >
        Create
      </button>
    </form>
  );
}
