import { prisma } from "@/prisma/src";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    NextResponse.json({ error: "Method not allowed" }, { status: 404 });
  }

  try {
    const allTweets = await prisma.post.findMany({
      include: {
        user: true, // Include user details
      },
      orderBy: {
        createdAt: "desc", // Sort posts by the `createdAt` field in descending order
      },
    });
    return NextResponse.json(
      {
        allTweets,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch tweets" },
      { status: 500 }
    );
  }
}
