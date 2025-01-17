import React from "react";
import MainLeftSideBar from "./MainLeftSideBar";
import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth";
import { user as User } from "../../app/api/actions/user";
import { allNotification } from "@/app/api/actions/allNotification";
import { redirect } from "next/navigation";

export async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const session: any = await getServerSession(auth);

  if (!session) {
    redirect("/auth");
  }

  return <>{children}</>;
}

const LeftSideBar = async () => {
  const session: any = await getServerSession(auth);
  
  const email = session?.user?.email;

  const existingUser = await User(email);
  const user = existingUser.user;

  const notifications = await allNotification(user?.id);
  return (
    <>
      <MainLeftSideBar session={session} notifications={notifications} />
    </>
  );
};

export default LeftSideBar;
