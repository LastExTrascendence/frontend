import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/ui/css/globals.css";

import RecoilRootProvider from "@/recoil/recoilRootProvider";
import StyledComponentsRegistry from "@/lib/registry";
import ProtectedRouted from "@/components/ProtectedRoute";
import ModalPortalProvider from "@/components/ModalPortalProvider";
import ToastContainerProvider from "@/components/ToastContainerProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | LET ",
    default: "The Last Ex Transcendence",
  },
  description: "The Last Ex Transcendence with App Router.",
  metadataBase: new URL("https://github.com/LastExTrascendence/frontend"),
  icons: {
    icon: "/LET.ico/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <StyledComponentsRegistry>
          <RecoilRootProvider>
            <ProtectedRouted>
              <ToastContainerProvider />
              {children}
            </ProtectedRouted>
          </RecoilRootProvider>
        </StyledComponentsRegistry>
        <ModalPortalProvider />
      </body>
    </html>
  );
}
