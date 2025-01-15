import React from "react";
import SearchBar from "./SearchBar";
import FollowBox from "./FollowBox";
import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth";
import { user as User } from "../../app/api/actions/user";

const RightSideBar = async () => {
  const session: any = await getServerSession(auth);
  const email = session?.user?.email;

  const existingUser = await User(email);
  const user = existingUser.user;
  return (
    <div className="h-full fixed right-4 justify-start gap-5 items-center flex-col p-5 hidden xl:flex w-[30%]">
      <SearchBar />
      <FollowBox user={user} />
    </div>
  );
};

export default RightSideBar;
