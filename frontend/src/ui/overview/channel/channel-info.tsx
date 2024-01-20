import { UserInfoDto } from "@/types/interface/user.interface";
import ChannelInfoHeader from "@/ui/overview/channel/channel-info-header";
import ChannelUserList from "@/ui/overview/channel/channel-user-list";

export default function ChannelInfo({ name, myInfo }: { name: string, myInfo: UserInfoDto }) {
  return (
    <div className="hidden h-full min-w-[300px] max-w-[350px] flex-col overflow-y-scroll bg-userInfoColor p-9 md:block">
      <ChannelInfoHeader name={name} />
      <ChannelUserList name={name} myInfo={myInfo} />
    </div>
  )
}