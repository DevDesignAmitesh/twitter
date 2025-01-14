"use client";

import { useRef } from "react";

export default function AutoResizeTextarea({
  placeHolder,
  value,
  onChange,
}: {
  placeHolder: string;
  value: string;
  onChange: (e: any) => void;
}) {
  const textareaRef = useRef(null);

  const handleInput = () => {
    const textarea: any = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height to recalculate
      textarea.style.height = `${textarea.scrollHeight}px`; // Set to scrollHeight
    }
  };

  return (
    <textarea
      value={value}
      onChange={onChange}
      ref={textareaRef}
      className="w-[60%] p-2 placeholder ml-12 rounded resize-none outline-none bg-transparent text-text"
      rows={1}
      placeholder={placeHolder}
      onInput={handleInput}
    ></textarea>
  );
}
