import React from "react";
import SearchBar from "./SearchBar";
import FollowBox from "./FollowBox";
import { allUsers } from "@/app/api/actions/allUsers";
import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth";

const RightSideBar = async () => {
  const session: any = await getServerSession(auth);
  const allUser = await allUsers();
  const users = allUser.allUsers;

  if (!session) {
    return null;
  }

  return (
    <div className="h-full fixed right-4 justify-start gap-5 items-center flex-col p-5 hidden xl:flex w-[30%]">
      <SearchBar />

      <div className="p-5 w-full border-color flex-col gap-4 flex justify-center items-start border-[1px] rounded-md">
        <h1 className="text-text font-medium">Who to follow?</h1>
        {users.map((user: any) => (
          <FollowBox key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default RightSideBar;
