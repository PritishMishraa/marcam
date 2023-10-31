import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { getServerSession } from "next-auth";
import Provider from "@/app/context/client-provider";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { cn } from "@/lib/utils";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const calSans = localFont({
  src: "../../public/fonts/CalSans-SemiBold.woff2",
});

export const metadata: Metadata = {
  title: "Marcam",
  description: "Bookmark Leetcode Wisdom with Marcam",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={cn(inter.className, "")}>
        <Provider session={session}>{children}</Provider>
      </body>
    </html>
  );
}
