import { prisma } from "@/prisma/src";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: "Invalid tweet ID" }, { status: 400 });
  }

  try {
    const tweet = await prisma.post.findUnique({
      where: { id },
      include: {
        user: true,
        comments: true,
      },
    });

    if (!tweet) {
      return NextResponse.json({ message: "Tweet not found" }, { status: 404 });
    }

    return NextResponse.json(tweet, { status: 200 });
  } catch (error) {
    console.error("Error fetching tweet:", error);
    return NextResponse.json(
      { message: "Error occurred while fetching tweet" },
      { status: 500 }
    );
  }
}
