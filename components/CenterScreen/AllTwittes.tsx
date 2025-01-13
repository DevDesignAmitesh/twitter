import React from "react";
import { FaRegHeart } from "react-icons/fa6";
import { LiaCommentSolid } from "react-icons/lia";

interface AllTwittesProps {
  onClick?: () => void;
}

const AllTwittes = ({ onClick }: AllTwittesProps) => {
  return (
    <div
      onClick={onClick}
      className="w-full border-b-[1px] hover:bg-gray-400/10 cursor-pointer border-color flex justify-center items-start flex-col p-4"
    >
      <div className="flex w-full justify-start items-start gap-4">
        <img
          className="h-12 object-cover object-center w-12 rounded-full"
          src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png"
          alt="profile"
        />
        <div className="w-full flex flex-col gap-4 justify-start items-start">
          <div className="w-full flex justify-start items-start flex-col gap-1">
            <div className="flex justify-center gap-2 items-center">
              <h1 className="text-text text-[16px]">hello</h1>
              <p className="text-gray-500 text-[13px]">@fucucku</p>
              <p className="text-gray-500 text-[13px]">2 seconds</p>
            </div>
            <p>My tweets</p>
          </div>
          <div className="w-full flex justify-start items-start gap-10">
            <div className="flex text-gray-500 justify-center cursor-pointer items-center gap-1.5">
              <LiaCommentSolid />
              <p>0</p>
            </div>
            <div className="flex text-gray-500 cursor-pointer justify-center items-center gap-1.5">
              <FaRegHeart />
              <p>0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTwittes;
