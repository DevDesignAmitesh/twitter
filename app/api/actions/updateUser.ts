"use server";

import { prisma } from "@/prisma/src";

export async function UpdateUser(
  name: string,
  userName: string,
  description: string,
  profileImg: string,
  bgImg: string,
  email: string
) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser) {
    return { message: "user not found with this email" };
  }
  const updatedUser = await prisma.user.update({
    where: {
      email: existingUser.email || "",
    },
    data: {
      name,
      userName: userName,
      bio: description,
      prfileImage: profileImg,
      coverImage: bgImg,
    },
  });

  await prisma.notification.create({
    data: {
      body: "user updated succesfully",
      userId: updatedUser.id,
    },
  });

  return { message: "user updated successfully" };
}
