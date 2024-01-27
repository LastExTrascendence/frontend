import SocketProvider from "@/components/SocketProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SocketProvider>{children}</SocketProvider>;
}
