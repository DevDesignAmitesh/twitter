import React from "react";
import SearchBar from "./SearchBar";
import FollowBox from "./FollowBox";

const RightSideBar = () => {
  return (
    <div className="h-full fixed right-4 justify-start gap-5 items-center flex-col p-5 hidden xl:flex w-[30%]">
      <SearchBar />
      <FollowBox />
    </div>
  );
};

export default RightSideBar;
