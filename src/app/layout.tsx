import { Toaster } from "sonner";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";

import "./globals.css";
import { cn } from "@/lib/utils";
import Provider from "@/app/context/auth-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ReactQueryProvider from "@/app/context/react-query-provider";

const inter = Inter({ subsets: ["latin"] });
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
      <body className={(cn(inter.className), "min-h-[100dvh] bg-secondary antialiased")}>
        <div className="relative min-h-[100dvh] flex max-w-6xl mx-auto flex-col">
          {/* <div className="fixed left-0 top-0 -z-10 h-full w-full">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
          </div> */}
          <Provider session={session}>
            {/* <SiteHeader /> */}
            <main className="flex-1">
              <ReactQueryProvider>
                {children}
                <Toaster expand={true} richColors />
              </ReactQueryProvider>
            </main>
          </Provider>
        </div>
      </body>
    </html>
  );
}
