"use server";

import { prisma } from "@/prisma/src";

export async function allUsers() {
  const allUsers = await prisma.user.findMany();

  return { allUsers };
}
