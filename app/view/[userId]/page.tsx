import { dynamicUser } from "@/app/api/actions/dynamicUser";
import { user as User } from "@/app/api/actions/user";
import View from "@/components/View";
import { auth } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = await params;
  const session: any = await getServerSession(auth);

  const user: any = await User(session?.user?.email);
  const list = user?.user?.followingIds;

  if (!session) {
    redirect("/auth");
  }

  const post = await dynamicUser(userId);
  return (
    <>
      <View post={post.post} list={list} user={user.user} />
    </>
  );
};

export default page;
