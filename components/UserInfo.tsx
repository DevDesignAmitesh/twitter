"use client";

import React from "react";
import { SlCalender } from "react-icons/sl";
import { format } from "date-fns";
import axios from "axios";
import { useRouter } from "next/navigation";

interface UserInfoProps {
  setPopup?: any; // Used for editing profile
  user: any; // Current logged-in user
  list?: any;
}

const UserInfo = ({ setPopup, user, list }: UserInfoProps) => {
  const router = useRouter();

  const isFollowing = () => {
    const isList = list || [];
    return isList.includes(user?.id); // Check if `userId` is in the current user's followingIds
  };

  const res = isFollowing(); // Boolean: true if following, false otherwise

  // Handle follow/unfollow action
  const handleFollow = async () => {
    if (!res) {
      await axios.post("/api/follow", { userId: user?.id as string });
      router.refresh();
    } else {
      await axios.delete("/api/follow", {
        data: { userId: user?.id as string },
      });
      router.refresh();
    }
  };

  const formattedDate = user?.createdAt
    ? format(new Date(user.createdAt), "MMM yyyy")
    : "N/A";

  return (
    <>
      <div className="flex w-full h-[180px] justify-center items-center relative">
        <img
          className="h-full w-full object-cover object-center"
          src={
            user?.coverImage ||
            "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png"
          }
          alt="bg-photo"
        />
        <div className="flex justify-between bottom-[-70px] h-full absolute items-end w-full p-5">
          <img
            src={
              user?.prfileImage ||
              "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png"
            }
            alt="profile-photo"
            className="h-[100px] w-[100px] object-cover object-center rounded-full"
          />
          {setPopup ? (
            <button
              onClick={() => setPopup(true)}
              className="px-6 py-2 hover:opacity-70 cursor-pointer text-secondary-btn-text rounded-full bg-secondary-btn font-medium"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={handleFollow}
              className={`px-6 py-2 cursor-pointer hover:opacity-70 rounded-full ${
                res
                  ? "border-2 border-color text-text"
                  : "bg-secondary-btn text-secondary-btn-text"
              } font-medium`}
            >
              {res ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-center w-full items-start gap-4 p-5 mt-14 flex-col">
        <div className="flex justify-center items-start w-full flex-col">
          <p className="text-2xl font-bold">{user?.name}</p>
          <p className="text-gray-500 text-xs">@{user?.userName}</p>
        </div>
        <p className="font-medium">{user?.bio}</p>
        <p className="font-medium">
          <SlCalender className="inline-block mr-1" />
          {formattedDate}
        </p>
        <div className="flex justify-start items-center gap-3 w-full">
          <p className="font-medium flex justify-center items-center gap-1">
            <p>{user?.followingIds?.length}</p>
            <span className="text-gray-500">Following</span>
          </p>
          <p className="font-medium flex justify-center items-center gap-1">
            <p>{user?.followersCount || 0}</p>
            <span className="text-gray-500">Followers</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
