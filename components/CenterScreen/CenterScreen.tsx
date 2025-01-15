"use client";

import React, { useState } from "react";
import Header from "./Header";
import AddTwitter from "./AddTwitter";
import AllTwittes from "./AllTwittes";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import axios from "axios";
import useSWR, { mutate } from "swr";

const CenterScreen = ({
  session,
  existingUser,
}: {
  session: any;
  existingUser: any;
}) => {
  const [panel, setPanel] = useState<boolean>(false);
  const [tweet, setTweet] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [message, setMessage] = useState<string>("");
  const fetcher = (url: any) => axios.get(url).then((res) => res.data);
  const { data } = useSWR("/api/allTweet", fetcher);
  const tweets = data?.allTweets || [];

  const handleAddTweet = async () => {
  
    if (!existingUser.email.trim() || !tweet.trim()) {
      setMessage("Email and tweet body are required.");
      setLoading(false);
      return;
    }
  
    const newTweet = {
      id: Date.now(),
      body: tweet,
      email: existingUser.email,
      createdAt: new Date().toISOString(), // Include timestamp for sorting
    };
  
    // Optimistic UI update
    mutate(
      "/api/allTweet",
      (currentData: any) => ({
        allTweets: [newTweet, ...(currentData?.allTweets || [])],
      }),
      false // Disable revalidation for now
    );
  
    try {
      // Send the new tweet to the server
      await axios.post("/api/addTweet", {
        body: tweet,
        email: existingUser.email,
      });
  
      // Revalidate tweets from the server
      mutate("/api/allTweet");
      setMessage("Tweet added successfully!");
      setTweet(""); // Clear input field
    } catch (error) {
      console.error("Error adding tweet:", error);
      setMessage("Failed to add tweet. Please try again.");
  
      // Revert optimistic update on failure
      mutate("/api/allTweet");
    } finally {
      setLoading(false);
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
      {session ? (
        <AddTwitter
          existingUser={existingUser}
          tweetPost={handleAddTweet}
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
          label={loading ? "Loading..." : "Post"}
          placeHolder="Whats happening . . . . ?"
        />
      ) : (
        <div className="w-full p-5">
          <button
            onClick={() => router.push("/auth")}
            className="w-full p-2 bg-secondary-btn text-secondary-btn-text rounded-md mt-10 mb-10"
          >
            Register
          </button>
        </div>
      )}
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
