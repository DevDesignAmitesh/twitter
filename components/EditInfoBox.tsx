"use client";

import React, { useState } from "react";
import { FaCheck, FaPen } from "react-icons/fa6";

interface EditInfoBoxProps {
  label: string;
  onChange: (e: any) => void;
  value: string;
  className?: string;
  maxLength?: number;
}

const EditInfoBox = ({
  label,
  onChange,
  value,
  className,
  maxLength,
}: EditInfoBoxProps) => {
  const [read, setRead] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  return (
    <div className="w-full flex flex-col justify-center gap-2 items-start">
      <p>{label}</p>
      <div className="flex justify-center w-full items-center gap-4">
        <input
          maxLength={maxLength}
          onChange={onChange}
          disabled={!read}
          value={value}
          type="text"
          className={`${className} w-full rounded-md p-2 border-[1px] border-black bg-transparent  ${
            read ? "opacity-100" : "opacity-50"
          }`}
        />
        {!editing ? (
          <FaPen
            onClick={() => {
              setRead(true);
              setEditing(true);
            }}
            className="cursor-pointer"
            size={20}
          />
        ) : (
          <FaCheck
            onClick={() => {
              setRead(false);
              setEditing(false);
            }}
            className="cursor-pointer"
            size={20}
          />
        )}
      </div>
    </div>
  );
};

export default EditInfoBox;
