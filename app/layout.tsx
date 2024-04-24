import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "./SessionProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weight Tracking App",
  description: "A user can track their weight.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
