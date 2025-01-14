"use client";

import React, { useState } from "react";
import Header from "./Header";
import AddTwitter from "./AddTwitter";
import AllTwittes from "./AllTwittes";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { addTweet } from "@/app/api/actions/addTweet";

const CenterScreen = ({
  session,
  tweets,
  existingUser,
}: {
  session: any;
  tweets: any;
  existingUser: any;
}) => {
  const [panel, setPanel] = useState<boolean>(false);
  const [tweet, setTweet] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const tweetPost = async () => {
    try {
      setLoading(true);
      if (!tweet) {
        setLoading(false);
        return;
      }
      await addTweet(tweet, session.user.email);
      setTweet("");
    } catch (e) {
      setLoading(false);
      setTweet("");
    } finally {
      setLoading(false);
      setTweet("");
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
      <Header label="Home" setPanel={setPanel} />
      <AddTwitter
        tweetPost={tweetPost}
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        label={loading ? "Loading..." : "Post"}
        placeHolder="Whats happening . . . . ?"
      />
      {tweets.map((tweet: any) => (
        <AllTwittes
          tweet={tweet}
          existingUser={existingUser}
          onClick={() => router.push("/tweet")}
        />
      ))}
    </div>
  );
};

export default CenterScreen;
