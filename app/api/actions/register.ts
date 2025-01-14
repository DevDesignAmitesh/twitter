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
  console.log(email, name, userName, password);
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
  return { success: true, message: "User registered successfully", user };
}
