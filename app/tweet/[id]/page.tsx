import React from "react";
import ReplyPage from "@/components/ReplyPage";
import { oneTweet } from "../../api/actions/oneTweet";
import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth";
import { user as User } from "../../../app/api/actions/user";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const tweet: any = await oneTweet(id);

  const session: any = await getServerSession(auth);
  if(!session){
    redirect("/auth")
  }
  const email = session?.user?.email;
  const existingUser = await User(email);
  const user = existingUser.user;

  return (
    <>
      <ReplyPage user={user} tweet={tweet.tweet} id={id} />
    </>
  );
};

export default page;
