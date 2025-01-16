"use client";

import React, { useState } from "react";
import Header from "./CenterScreen/Header";
import UserInfo from "./UserInfo";
import { RxCross2 } from "react-icons/rx";
import AllTwittes from "./CenterScreen/AllTwittes";
import { useRouter } from "next/navigation";

const View = ({ post }: { post: any }) => {
  const router = useRouter();
  const [panel, setPanel] = useState<boolean>(false);
  return (
    <>
      <div className="min-h-screen relative border border-color flex flex-col justify-start items-center w-[100%] md:w-[65%] xl:w-[45%]">
        <div
          className={`h-[200px] absolute z-40 ${
            panel ? "translate-x-0 block" : "translate-x-full hidden"
          } flex flex-col justify-start transition-all duration-200 items-start p-5 sm:hidden right-0 top-0 bottom-0 w-[50%] rounded-l-md bg-secondary-btn text-secondary-btn-text`}
        >
          <RxCross2
            onClick={() => setPanel(false)}
            size={25}
            className=" absolute right-4 top-4 cursor-pointer"
          />
          <div className="flex flex-col gap-4 justify-start items-start w-full">
            <p className="text-lg font-medium cursor-pointer">Home</p>
            <p className="text-lg font-medium cursor-pointer">Notifications</p>
            <p className="text-lg font-medium cursor-pointer">Profile</p>
            <p className="text-lg font-medium cursor-pointer">Log out</p>
          </div>
        </div>
        <Header visible label={post[0]?.user?.name} setPanel={setPanel} />
        <UserInfo user={post[0]?.user} />
        {post?.map((tweet: any) => (
          <AllTwittes
            tweet={tweet}
            onClick={() => router.push(`/tweet/${tweet.id}`)}
          />
        ))}
      </div>
    </>
  );
};

export default View;
