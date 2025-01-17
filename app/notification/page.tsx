import Notifications from "@/components/Notifcation";
import React from "react";
import { allNotification } from "../api/actions/allNotification";
import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth";
import { user as User } from "../../app/api/actions/user";

const page = async () => {
  const session: any = await getServerSession(auth);
  const email = session?.user?.email;

  const existingUser = await User(email);
  const user = existingUser.user;

  const notifications = await allNotification(user?.id);

  return (
    <>
      <Notifications notifications={notifications?.notifications} />
    </>
  );
};

export default page;
