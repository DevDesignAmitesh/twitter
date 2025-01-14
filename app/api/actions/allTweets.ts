"use server";

import { prisma } from "@/prisma/src";

export async function allTweets() {
  const allTweets = await prisma.post.findMany();
  return allTweets;
}
