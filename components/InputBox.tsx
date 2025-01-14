import React from "react";

interface InputBoxProps {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type?: string;
}

const InputBox = ({ label, onChange, value, type = "text" }: InputBoxProps) => {
  return (
    <div className="flex w-full border-[1px] rounded-md justify-start items-center gap-2">
      <h1 className="ml-5">{label}</h1>
      <input
        onChange={onChange}
        value={value}
        type={type}
        className="bg-transparent outline-none p-2 w-full text-gray-200"
      />
    </div>
  );
};

export default InputBox;
