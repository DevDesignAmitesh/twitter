import CenterScreen from "@/components/CenterScreen/CenterScreen";
import { auth } from "@/lib/auth";
import React from "react";
import { getServerSession } from "next-auth";
import { user as User } from "./api/actions/user";

const page = async () => {
  const session: any = await getServerSession(auth);

  const email = session?.user?.email;
  const existingUser = await User(email);
  const user = existingUser.user

  return (
    <>
      <CenterScreen
        session={session!}
        existingUser={user}
      />
    </>
  );
};

export default page;
