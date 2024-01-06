import ChannelSocketProvider from "@/components/ChannelSocketProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ChannelSocketProvider>{children}</ChannelSocketProvider>;
}
