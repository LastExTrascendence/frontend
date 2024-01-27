import GameSocketProvider from "@/components/GameSocketProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <GameSocketProvider>{children}</GameSocketProvider>;
}
