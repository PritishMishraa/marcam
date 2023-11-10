"use server";

import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const createBookmark = async ({ url }: { url: string }) => {
  const session = await getServerSession(authOptions);

  if (!session) throw new Error("Session not found");

  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  const urlData = await prisma.bookmark.create({
    data: {
      url: url,
      email: session.user.email,
    },
  });

  return urlData;
};

export const getBookmarks = async () => {
  const session = await getServerSession(authOptions);

  if (!session) throw new Error("Session not found");

  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  const bookmarks = await prisma.bookmark.findMany({
    where: {
      email: session.user.email,
    },
  });

  return bookmarks;
};

export const deleteBookmark = async ({ id }: { id: number }) => {
  const session = await getServerSession(authOptions);

  if (!session) throw new Error("Session not found");

  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  const bookmark = await prisma.bookmark.delete({
    where: {
      id: id,
    },
  });

  return bookmark;
};

export const updateBookmark = async ({
  id,
  url,
  note,
  title,
}: {
  id: number;
  url: string;
  note?: string;
  title?: string;
}) => {
  const session = await getServerSession(authOptions);

  if (!session) throw new Error("Session not found");

  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  const bookmark = await prisma.bookmark.update({
    where: {
      id: id,
    },
    data: {
      url: url,
      note: note,
      title: title,
    },
  });

  return bookmark;
};
