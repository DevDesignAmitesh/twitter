import React from "react";
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  return (
    <div className="flex gap-2 w-full justify-center items-center border-[1px] border-color rounded-full py-2 px-3">
      <CiSearch size={20} />
      <input
        className="text-[14px] w-full outline-none font-[300] text-text bg-transparent"
        type="text"
        placeholder="Search"
      />
    </div>
  );
};

export default SearchBar;
