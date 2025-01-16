// pages/api/comments/index.js
import { prisma } from "@/prisma/src"; // Import your Prisma client
import { NextRequest, NextResponse } from "next/server"; // Import NextRequest and NextResponse

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl; // Get the search parameters (query params) from the URL
  const postId = searchParams.get("postId");

  if (!postId) {
    return NextResponse.json({ message: "postId required" }, { status: 400 });
  }

  try {
    // Query the Prisma database for comments related to the given postId
    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
      select: {
        user: true,
        body: true,
        id: true,
        createdAt: true,
      },
    });

    if (!comments || comments.length === 0) {
      return NextResponse.json(
        { message: "comments not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
