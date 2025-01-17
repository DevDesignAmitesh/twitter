import { auth } from "@/lib/auth";
import { prisma } from "@/prisma/src";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest) {
  const session: any = await getServerSession(auth);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const currentUserEmail = session?.user?.email;

  if (!currentUserEmail) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 403 }
    );
  }
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { message: "User ID not provided" },
        { status: 400 }
      );
    }

    const likedUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!likedUser) {
      return NextResponse.json({
        message: "user not found",
      });
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: currentUserEmail },
    });

    if (currentUser?.id === userId) {
      return NextResponse.json(
        { message: "You cannot follow/unfollow yourself" },
        { status: 400 }
      );
    }

    if (!currentUser) {
      return NextResponse.json(
        { message: "Current user not found" },
        { status: 404 }
      );
    }

    let likedUserFollowerCount = likedUser.followersCount || 0;

    let updatedFollowingIds = [...(currentUser.followingIds || [])];

    if (req.method === "POST") {
      // Add the userId if not already followed
      if (!updatedFollowingIds.includes(userId)) {
        updatedFollowingIds.push(userId);
        likedUserFollowerCount += 1;
      } else {
        return NextResponse.json(
          { message: "User is already followed" },
          { status: 400 }
        );
      }
    }

    if (req.method === "DELETE") {
      // Remove the userId if currently followed
      if (updatedFollowingIds.includes(userId)) {
        updatedFollowingIds = updatedFollowingIds.filter((id) => id !== userId);
        likedUserFollowerCount -= 1;
      } else {
        return NextResponse.json(
          { message: "User is not currently followed" },
          { status: 400 }
        );
      }
    }

    // Update the current user's followingIds
    const updatedUser = await prisma.user.update({
      where: { email: currentUserEmail },
      data: { followingIds: updatedFollowingIds },
    });

    const updateLikedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        followersCount: likedUserFollowerCount,
      },
    });

    return NextResponse.json(
      {
        message: req.method === "POST" ? "User followed" : "User unfollowed",
        updatedUser,
        followersCount: updateLikedUser.followersCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating followingIds:", error);
    return NextResponse.json(
      { message: "An error occurred while updating follow status" },
      { status: 500 }
    );
  }
}

export { handler as DELETE, handler as POST };
