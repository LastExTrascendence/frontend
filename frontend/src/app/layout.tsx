import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/ui/css/globals.css";
import RecoilRootProvider from "@/utils/recoilRootProvider";
import SocketProvider from "@/components/SocketProvider";
import StyledComponentsRegistry from "@/lib/registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | LET ",
    default: "The Last Ex Transcendence",
  },
  description: "The Last Ex Transcendence with App Router.",
  metadataBase: new URL("https://github.com/LastExTrascendence/frontend"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SocketProvider>
          <RecoilRootProvider>
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          </RecoilRootProvider>
        </SocketProvider>
        <div id="modal-portal"></div>
      </body>
    </html>
  );
}
