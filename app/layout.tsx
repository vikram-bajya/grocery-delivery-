import type { Metadata } from "next";

import "./globals.css";
import Provider from "@/Provider";



import { Session } from "inspector";
import { SessionProvider } from "next-auth/react";


export const metadata: Metadata = {
  title: "Snapcart |10 minutes grocery delivery App",
  description: "10 minutes grocery delivery App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full min-h-screen bg-linear-to-b from-green-100 to-white">
        <Provider session={Session}>{children}</Provider>
      </body>
    </html>
  );
}
