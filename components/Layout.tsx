import React from "react";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import CenterScreen from "./CenterScreen";

const Layout = () => {
  return (
    <main className="bg-black text-white h-screen flex justify-center items-center w-full">
      <div className="w-[80%] flex justify-center items-center h-full">
        <LeftSideBar />
        <CenterScreen />
        <RightSideBar />
      </div>
    </main>
  );
};

export default Layout;
