import { dynamicUser } from "@/app/api/actions/dynamicUser";
import View from "@/components/View";
import { auth } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = await params;
  const session: any = await getServerSession(auth);
  if (!session) {
    redirect("/auth");
  }

  const post = await dynamicUser(userId);
  return (
    <>
      <View post={post.post} />
    </>
  );
};

export default page;
