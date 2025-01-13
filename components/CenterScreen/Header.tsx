"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import ToggleBtn from "../ToggleBtn";

interface HeaderProps {
  visible?: boolean;
  label: string;
  setPanel?: any;
}

const Header = ({ visible, label, setPanel }: HeaderProps) => {
  const router = useRouter();

  return (
    <div className="w-full bg-background text-text flex border-b-[1px] border-color p-5">
      <header className="w-full flex justify-between items-center">
        <div className="flex justify-start gap-4 items-center w-full">
          {visible && (
            <FaArrowLeftLong className="cursor-pointer" onClick={() => router.push("/")} size={25} />
          )}
          <p className="text-text font-semibold text-xl">{label}</p>
        </div>
        <div className="flex sm:hidden gap-4 justify-center items-center">
          <ToggleBtn />
          <button className="flex justify-end items-center w-full">
            <GiHamburgerMenu onClick={() => setPanel(true)} size={25} />
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
