"use client";

import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import Header from "@/components/CenterScreen/Header";
import AllTwittes from "@/components/CenterScreen/AllTwittes";
import UserInfo from "@/components/UserInfo";
import { FaPen } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const page = () => {
  const [panel, setPanel] = useState<boolean>(false);
  const [popup, setPopup] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div className="min-h-screen relative border border-color flex flex-col justify-start items-center w-[100%] md:w-[65%] xl:w-[45%]">
      {popup && (
        <div className="w-[500px] h-[550px] bg-background text-text rounded-md overflow-hidden absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[350px] flex justify-start items-center gap-10 flex-col px-10 py-5">
          <nav className="w-full flex justify-between items-start">
            <p className="text-text font-semibold text-xl">Edit</p>
            <IoClose
              className="cursor-pointer"
              onClick={() => setPopup(false)}
              size={25}
            />
          </nav>
          <div className="flex justify-center items-center w-full flex-col gap-5">
            <div className="w-full flex justify-between items-center">
              <p>Name</p>
              <div className="flex justify-center items-center gap-4">
                <p>My Name</p>
                <FaPen className="cursor-pointer" size={20} />
              </div>
            </div>
            <div className="w-full flex justify-between items-center">
              <p>Username</p>
              <div className="flex justify-center items-center gap-4">
                <p>My username</p>
                <FaPen className="cursor-pointer" size={20} />
              </div>
            </div>
            <div className="w-full flex justify-between items-center">
              <p>Description</p>
              <div className="flex justify-center items-center gap-4">
                <p>My description</p>
                <FaPen className="cursor-pointer" size={20} />
              </div>
            </div>
          </div>
        </div>
      )}
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
      <Header visible label="My Name" setPanel={setPanel} />
      <UserInfo setPopup={setPopup} />
      <AllTwittes onClick={() => router.push("/tweet")} />
      <AllTwittes onClick={() => router.push("/tweet")} />
      <AllTwittes onClick={() => router.push("/tweet")} />
    </div>
  );
};

export default page;
