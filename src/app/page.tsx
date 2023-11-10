import Link from "next/link";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db";

import SignIn from "@/components/sign-in";
import { siteConfig } from "@/config/site";
import { Bookmark, Star, User } from "lucide-react";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const getUsers = await prisma.user.findMany();
  const getBookmarks = await prisma.bookmark.findMany();
  const githubInfo = await fetch(
    "https://api.github.com/repos/PritishMishraa/marcam"
  ).then((res) => res.json());

  return (
    <main className="container flex max-w-screen-md flex-col items-center p-5">
      <section className="space-y-6 pb-32 pt-6 md:pt-10 lg:py-32">
        <div className="container flex w-full max-w-[64rem] flex-col items-center gap-4 text-center">
          <Link
            href="https://twitter.com/PritishhMishraa"
            className="rounded-2xl border bg-background px-4 py-1.5 text-xs font-medium"
            target="_blank"
          >
            @PritishhMishraa&apos;s twitter
          </Link>

          <h1 className="font-heading text-3xl sm:text-4xl">
            <span className="font-mono font-semibold">marcam</span>
          </h1>

          <div className="grid grid-cols-2 gap-4 text-black">
            <div className="flex flex-col items-center space-y-1 rounded-md border-2 border-green-400 bg-green-100 px-8 py-3">
              <User className="h-8 w-8 text-green-600" />
              <p className="text-xs">Users</p>
              <p>{getUsers?.length}</p>
            </div>

            <div className="flex flex-col items-center space-y-1 rounded-md border-2 border-blue-400 bg-blue-100 px-8 py-3">
              <Bookmark className="h-8 w-8 text-blue-600" />
              <p className="text-xs">Bookmarks</p>
              <p>{getBookmarks?.length}</p>
            </div>
          </div>

          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            feature rich, minimalistic and open source LeetCode bookmarker.
            Built with Next.js 14, shadcn/ui, Prisma, NextAuth and NeonDB.
          </p>

          <div className="mt-4 flex space-x-4">
            {session?.user?.email ? (
              <Link
                className="flex h-10 items-center rounded-md bg-slate-900 px-8 text-sm text-white"
                href="/dashboard"
              >
                Dashboard
              </Link>
            ) : (
              <SignIn />
            )}
            <Link
              href="https://github.com/PritishMishraa/marcam"
              target="_blank"
              rel="noreferrer"
              className="relative flex h-10 items-center gap-2 rounded-md border bg-background px-8 text-sm"
            >
              <p>Github</p>
              <div className="absolute -top-4 right-2.5 flex items-center gap-1 rounded-md bg-foreground px-2 text-background">
                <Star className="h-2.5 w-2.5" />
                <p className="pt-0.5 font-mono text-[0.6rem] font-bold">
                  {githubInfo?.stargazers_count}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
