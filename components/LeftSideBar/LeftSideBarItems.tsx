import React, { ReactElement } from "react";

interface LeftSideBarItemsProps {
  label: string;
  icon: ReactElement;
  onClick: () => void;
  className?: string;
}

const LeftSideBarItems = ({
  label,
  icon,
  onClick,
  className,
}: LeftSideBarItemsProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center cursor-pointer items-center gap-4 ${className}`}
    >
      {icon}
      <p className="text-[18px] hidden md:block font-medium">{label}</p>
    </button>
  );
};

export default LeftSideBarItems;
