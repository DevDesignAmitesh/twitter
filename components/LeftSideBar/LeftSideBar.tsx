"use client";

import React from "react";
import { FaBell, FaFeatherPointed, FaUser, FaXTwitter } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import LeftSideBarItems from "./LeftSideBarItems";
import ToggleBtn from "../ToggleBtn";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const LeftSideBar = ({ session }: any) => {
  const router = useRouter();
  return (
    <div className="h-full bg-background text-text left-0 fixed xl:left-20 justify-start gap-8 p-5 items-start flex-col hidden sm:flex md:w-[30%] xl:w-[25%]">
      <FaXTwitter size={30} />
      {session && (
        <>
          <LeftSideBarItems
            onClick={() => router.push("/")}
            label="Home"
            icon={<IoHome size={25} />}
          />
          <LeftSideBarItems
            onClick={() => router.push("/notification")}
            label="Notifications"
            icon={<FaBell size={25} />}
          />
          <LeftSideBarItems
            onClick={() => router.push("/profile")}
            label="Profile"
            icon={<FaUser size={25} />}
          />
          <LeftSideBarItems
            onClick={() => signOut()}
            label="Log out"
            icon={<BiLogOut size={25} />}
          />
        </>
      )}
      <button className="bg-secondary-btn text-secondary-btn-text p-3 rounded-full block md:hidden">
        <FaFeatherPointed size={15} />
      </button>
      <ToggleBtn />
    </div>
  );
};

export default LeftSideBar;
