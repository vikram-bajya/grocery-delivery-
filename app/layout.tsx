import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/Provider";
import { auth } from "@/app/auth";

export const metadata: Metadata = {
  title: "Snapcart | 10 minutes grocery delivery App",
  description: "10 minutes grocery delivery App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // In v5, we call auth() to get the session and this is importent for server components ok
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="w-full min-h-screen bg-linear-to-b from-green-100 to-white">
        <Provider session={session}>{children}</Provider>
      </body>
    </html>
  );
}
