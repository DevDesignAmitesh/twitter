"use client";

import axios from "axios";
import { formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { LiaCommentSolid } from "react-icons/lia";

interface AllTwittesProps {
  onClick?: () => void;
  tweet: any;
  existingUser?: any;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const AllTwittes = ({ onClick, tweet, existingUser }: AllTwittesProps) => {
  // Use SWR to fetch the latest tweet data
  const { data: updatedPost, mutate } = useSWR(
    `/api/tweet/${tweet.id}`,
    fetcher,
    {
      fallbackData: tweet, // Use the initial `tweet` prop as fallback data
    }
  );
  
  const liked = updatedPost?.likedIds?.includes(existingUser?.id);
  const likeCount = updatedPost?.likedIds?.length || 0;

  const handleLike = async () => {
    if (!liked) {
      await axios.post("/api/like", {
        userId: existingUser.id as string,
        postId: updatedPost.id as string,
      });
    } else {
      await axios.delete("/api/like", {
        data: {
          userId: existingUser.id as string,
          postId: updatedPost.id as string,
        },
      });
    }
    mutate(); // Revalidate the SWR cache to fetch the updated data
  };

  return (
    <>
      <div
        key={updatedPost?.id}
        className="w-full border-b-[1px] border-color flex justify-center items-start flex-col p-4"
      >
        <div className="flex w-full justify-start items-start gap-4">
          <img
            className="h-12 object-cover object-center w-12 rounded-full"
            src={
              updatedPost?.user?.prfileImage ||
              "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png"
            }
            alt="profile"
          />
          <div className="w-full flex flex-col gap-4 justify-start items-start">
            <div className="w-full flex justify-start items-start flex-col gap-1">
              <div className="flex w-full justify-start gap-1 md:flex-row flex-col md:gap-3 items-start">
                <Link
                  href={`/view/${updatedPost?.user?.id}`}
                  className="flex justify-center hover:border-b-[1px] border-color items-start gap-2"
                >
                  <h1 className="text-text whitespace-nowrap w-full text-[14px]">
                    {updatedPost?.user?.name}
                  </h1>
                  <p className="text-gray-500 whitespace-nowrap w-full text-[11px]">
                    @{updatedPost?.user?.userName}
                  </p>
                </Link>
                <p className="text-gray-500 whitespace-nowrap text-[11px]">
                  {formatDistanceToNowStrict(new Date(updatedPost?.createdAt))}{" "}
                  ago
                </p>
              </div>
              <p
                onClick={onClick}
                className="w-full cursor-pointer hover:underline transition"
              >
                {updatedPost?.body}
              </p>
            </div>
            <div className="w-full flex justify-start items-start gap-10">
              <div className="flex text-gray-500 justify-center cursor-pointer items-center gap-1.5">
                <LiaCommentSolid />
                <p>{updatedPost?.comments?.length || 0}</p>
              </div>
              <div
                onClick={handleLike}
                className="flex hover:opacity-80 text-gray-500 cursor-pointer justify-center items-center gap-1.5"
              >
                {liked ? <FaHeart /> : <FaRegHeart />} <p>{likeCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllTwittes;
