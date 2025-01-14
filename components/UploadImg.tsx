"use client";

import { useState } from "react";

interface UploadImgProps {
  label: string;
  changeLabel: string;
  className?: string;
  onImageChange: (imageUrl: string) => void,
}

export default function UploadImg({
  label,
  changeLabel,
  className,
  onImageChange
}: UploadImgProps) {
  const [img, setImg] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const filePreviewURL = URL.createObjectURL(selectedFile);
      onImageChange(filePreviewURL);
      setImg(filePreviewURL);
    }
  };

  return (
    <div
      className={`w-full relative flex flex-col items-center justify-center bg-background text-text rounded-lg ${className}`}
    >
      {!img ? (
        <label className="cursor-pointer bg-secondary-btn text-secondary-btn-text px-4 py-2 rounded-md">
          {label}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      ) : (
        <div className="relative w-full h-full bg-background rounded-md flex items-center justify-center">
          <img
            src={img}
            alt="Uploaded Preview"
            className="w-full h-full object-cover rounded-md"
          />
          {/* Change Image Button */}
          <label className="absolute bottom-2 right-2 cursor-pointer bg-secondary-btn text-secondary-btn-text text-sm px-2 py-1 rounded-md">
            {changeLabel}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  );
}
