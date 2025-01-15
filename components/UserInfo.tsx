import React from "react";
import { SlCalender } from "react-icons/sl";

const UserInfo = ({ setPopup, user }: { setPopup: any; user: any }) => {
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
          <button
            onClick={() => setPopup(true)}
            className="px-6 py-2 hover:opacity-70 text-secondary-btn-text rounded-full bg-secondary-btn font-medium"
          >
            Edit
          </button>
        </div>
      </div>
      <div className="flex justify-center w-full items-start gap-4 p-5 mt-14 flex-col">
        <div className="flex justify-center items-start w-full flex-col">
          <p className="text-2xl font-bold">{user?.name}</p>
          <p className="text-gray-500 text-xs">{user?.userName}</p>
        </div>
        <p className="font-medium">{user?.bio}</p>
        <p className="font-medium">
          <SlCalender className="inline-block mr-1" />
          {new Date(user?.createdAt).toLocaleString()}
        </p>
        <div className="flex justify-start items-center gap-3 w-full">
          <p className="font-medium flex justify-center items-center gap-1">
            <p>1</p>
            <span className="text-gray-500">Following</span>
          </p>
          <p className="font-medium flex justify-center items-center gap-1">
            <p>1</p>
            <span className="text-gray-500">Followers</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
