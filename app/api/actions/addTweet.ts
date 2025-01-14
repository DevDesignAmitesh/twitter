"use server";

import { prisma } from "@/prisma/src";

export async function addTweet(body: string, email: string) {
  if (!body || !email) {
    return { message: "inputs are required" };
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return { message: "user not found" };
  }

  await prisma.post.create({
    data: {
      body,
      userId: user.id,
    },
  });

  return { message: "tweet added" };
}
