import React from "react";

const LeftSideBarBtn = ({ label }: { label: string }) => {
  return (
    <button className="bg-secondary-btn hidden md:block hover:opacity-80 text-secondary-btn-text font-medium text-xl w-full py-2 text-center rounded-full">
      {label}
    </button>
  );
};

export default LeftSideBarBtn;
