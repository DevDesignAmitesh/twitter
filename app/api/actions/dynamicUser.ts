"use server";

import { prisma } from "@/prisma/src";

export async function dynamicUser(id: string) {
  if (!id) {
    return { message: "userid us required" };
  }

  const post = await prisma.post.findMany({
    where: {
      userId: id,
    },
    include: {
      user: true
    }
  });

  if (!post) {
    return { message: "post not found" };
  }

  return { post };
}
