"use server";

import { rateLimit } from "@/lib/auth";
import { prisma } from "@/prisma/src";
import { hash } from "bcrypt";

export async function register({
  email,
  name,
  userName,
  password,
}: {
  email: string;
  name: string;
  userName: string;
  password: string;
}) {
  const rateLimitCount = 5; // Max 5 registration attempts
    const rateLimitInterval = 60000; // Per minute (60,000 ms)

    if (!rateLimit(email, rateLimitCount, rateLimitInterval)) {
      throw new Error(
        "Too many registration attempts. Please try again later."
      );
    }
  if (!email || !name || !userName || !password) {
    return {
      success: false,
      message: "Please provide all the required fields",
    };
  }

  const hashedPassword = await hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      userName,
      name,
      hashedPassword,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "Failed to register user",
    };
  }

  await prisma.notification.create({
    data: {
      body: "user registered succesfully",
      userId: user.id,
    },
  });
  return { success: true, message: "User registered successfully", user };
}
