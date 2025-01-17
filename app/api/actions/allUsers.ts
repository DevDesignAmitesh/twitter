"use server";

import { prisma } from "@/prisma/src";

export async function allUsers(email: any) {
  const allUsers = await prisma.user.findMany({
    where: {
      email: {
        not: email,
      },
    },
  });

  return { allUsers };
}
