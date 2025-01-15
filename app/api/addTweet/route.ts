import { prisma } from "@/prisma/src";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { body, email } = await req.json();

    // Validate inputs
    if (!body || !email) {
      return NextResponse.json(
        { message: "Inputs are required" },
        { status: 400 }
      );
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Add the new tweet
    await prisma.post.create({
      data: {
        body,
        userId: user.id,
      },
    });

    return NextResponse.json(
      { message: "Tweet added successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error adding tweet:", error);
    return NextResponse.json(
      { message: "Failed to add tweet", error: error.message },
      { status: 500 }
    );
  }
}
