"use server";

import { prisma } from "@/prisma/src";

export async function allNotification(userId: any) {
  if (!userId) {
    return { message: "userId required" };
  }

  const notifications = await prisma.notification.findMany({
    where: {
      userId,
    },
  });

  if (!notifications) {
    return { message: "no notifications available" };
  }

  return { message: "notification found", notifications };
}
