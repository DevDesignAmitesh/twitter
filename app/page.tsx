import CenterScreen from "@/components/CenterScreen/CenterScreen";
import { auth } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import { allTweets } from "./api/actions/allTweets";
import { user as User } from "./api/actions/user";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {
  const session: any = await getServerSession(auth);
  if (!session) {
    // Handle the case when no session is found (e.g., redirect to login or show a message)
    // You can use Next.js `redirect` or return a fallback UI
    redirect("/auth")
  }

  const tweets = await allTweets();
  const email = session?.user?.email;
  const existingUser = await User(email);
  const user = existingUser.user

  return (
    <>
      <CenterScreen
        session={session!}
        tweets={tweets}
        existingUser={user}
      />
    </>
  );
};

export default page;
