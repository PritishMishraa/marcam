import Link from "next/link";

import { siteConfig } from "@/config/site";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function SiteHeader() {
  const session = await getServerSession(authOptions);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between space-x-4">
        <Link href="/" className="mr-2 flex items-center space-x-2 md:mr-6">
          <Image alt="logo" src="/logo-svg.svg" width={28} height={28} />
          <span className="hidden font-bold md:inline-block">
            {siteConfig.title}
          </span>
        </Link>
        <Image
          className="rounded-full border-2 h-8 w-8 object-cover relative"
          alt="User profile picture"
          height={32}
          width={32}
          unoptimized={true}
          src={session?.user?.image || ""}
          priority
        />
      </div>
    </header>
  );
}
