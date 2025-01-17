"use server";

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
