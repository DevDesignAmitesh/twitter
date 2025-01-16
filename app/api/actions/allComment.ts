"use server";

import { prisma } from "@/prisma/src";

export async function uniqueComment(postId: any) {
  if (!postId) {
    return { message: "id required" };
  }

  const comment = await prisma.comment.findMany({
    where: {
      postId,
    },
    select: {
      user: true,
      body: true,
      id: true,
      createdAt: true
    },
    orderBy: {
      createdAt: "desc", // Sort posts by the `createdAt` field in descending order
    },
  });

  if (!comment) {
    return { message: "comment not found" };
  }

  return { comment };
}
