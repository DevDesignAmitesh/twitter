"use client";

import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Header from "@/components/CenterScreen/Header";
import AddTwitter from "@/components/CenterScreen/AddTwitter";
import AllTwittes from "@/components/CenterScreen/AllTwittes";
import { addComment } from "@/app/api/actions/addComment";
import axios from "axios";
import useSWR from "swr";

const ReplyPage = ({
  tweet,
  user,
  id
}: {
  tweet: any;
  user: any;
  id: any
}) => {
  const [panel, setPanel] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

  const fetchComments = async (url: string) => {
    const response = await axios.get(url); // Make a GET request
    return response.data.comments; // Return the comments from the response
  };

  const { data: comments, error, isLoading } = useSWR(
    id ? `/api/getComments?postId=${id}` : null, // Only fetch if postId exists
    fetchComments
  );

  const handleComment = async () => {
    try {
      setLoading(true);
      await addComment(comment, user.id, tweet.id);
      setComment("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      return;
    }
  };

  return (
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
      <Header visible label="Tweet" setPanel={setPanel} />
      <AllTwittes tweet={tweet} />
      <h1 className="text-xl font-semibold px-5 py-3 w-full text-start">
        Replies
      </h1>
      <AddTwitter
        existingUser={user}
        tweetPost={handleComment}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        label={loading ? "Loading..." : "Reply"}
        placeHolder="Your comment"
      />

      {comments?.map((com: any) => {
        return <AllTwittes key={com.id} tweet={com} />;
      })}
    </div>
  );
};

export default ReplyPage;
