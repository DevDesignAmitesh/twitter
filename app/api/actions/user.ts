"use server";

import { prisma } from "@/prisma/src";

export async function user(email: string) {
  if (!email) {
    return { message: "Email is required" };
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return { message: "User not found" };
  }

  return { message: "user found", user };
}
