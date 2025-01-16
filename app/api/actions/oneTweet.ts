"use server";

import { prisma } from "@/prisma/src";

export async function oneTweet(id: any) {
  const tweet = await prisma.post.findUnique({
    where: {
      id,
    },
    select: {
      user: true,
      id: true,
      body: true,
      createdAt: true,
      comments: true,
    },
  });

  console.log(tweet)

  return { tweet };
}
