import { auth } from "@/lib/auth";
import { prisma } from "@/prisma/src";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  const session = await getServerSession(auth);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { userId, postId } = await req.json();

  if (!userId || !postId) {
    return NextResponse.json(
      { message: "All fields required" },
      { status: 400 }
    );
  }

  const findUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!findUser) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const findPost = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!findPost) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  let updatedLikedIds = [...(findPost.likedIds || [])];

  try {
    if (req.method === "POST") {
      // Add user ID to likedIds
      if (!updatedLikedIds.includes(userId)) {
        updatedLikedIds.push(userId);

        // Update the post in the database
        const updatedPost = await prisma.post.update({
          where: { id: postId },
          data: { likedIds: updatedLikedIds },
        });

        await prisma.notification.create({
          data: {
            body: "Someone liked your tweet",
            userId: findPost.userId,
          },
        });

        return NextResponse.json(
          { message: "Post liked successfully", updatedPost },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "Post is already liked" },
          { status: 400 }
        );
      }
    }

    if (req.method === "DELETE") {
      // Remove user ID from likedIds
      if (updatedLikedIds.includes(userId)) {
        updatedLikedIds = updatedLikedIds.filter((id) => id !== userId);

        // Update the post in the database
        const updatedPost = await prisma.post.update({
          where: { id: postId },
          data: { likedIds: updatedLikedIds },
        });

        return NextResponse.json(
          { message: "Post unliked successfully", updatedPost },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "Post is already not liked" },
          { status: 400 }
        );
      }
    }
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { message: "Error occurred while updating" },
      { status: 500 }
    );
  }
}

export { handler as DELETE, handler as POST };
