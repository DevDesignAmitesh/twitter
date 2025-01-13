import Link from "next/link";
import React, { ReactElement } from "react";

interface LeftSideBarItemsProps {
  label: string;
  icon: ReactElement;
  onClick: () => void;
}

const LeftSideBarItems = ({ label, icon, onClick }: LeftSideBarItemsProps) => {
  return (
    <button
    onClick={onClick}
      className="flex justify-center cursor-pointer items-center gap-4"
    >
      {icon}
      <p className="text-[18px] hidden md:block font-medium">{label}</p>
    </button>
  );
};

export default LeftSideBarItems;
