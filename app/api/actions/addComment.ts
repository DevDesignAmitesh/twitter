"use server";

import { prisma } from "@/prisma/src";
import { NextResponse } from "next/server";

export async function addComment(body: string, userId: string, postId: string) {
  if (!body || !userId || !postId) {
    return { message: "all fields required" };
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    return NextResponse.json({
      message: "no post found",
    });
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

  await prisma.notification.create({
    data: {
      body: "Some commented on you post",
      userId: post.userId,
    },
  });

  return { message: "comment added" };
}
