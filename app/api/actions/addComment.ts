"use server";

import { prisma } from "@/prisma/src";

export async function addComment(body: string, userId: string, postId: string) {
  if (!body || !userId || !postId) {
    return { message: "all fields required" };
  }

  const comment = await prisma.comment.create({
    data: {
      body,
      userId,
      postId,
    },
  });

  if (!comment) {
    return { message: "error occured while adding comment" };
  }

  return { message: "comment added" };
}
