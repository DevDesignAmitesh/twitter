import React from "react";
import AutoResizeTextarea from "./AutoResizeTextarea";

const AddTwitter = ({
  label,
  placeHolder,
  onChange,
  value,
  tweetPost,
}: {
  label: string;
  placeHolder: string;
  onChange: (e: any) => void;
  value: string;
  tweetPost: any;
}) => {
  return (
    <div className="w-full relative min-h-[150px]">
      <div className="w-full min-h-[100px] relative py-2 px-4">
        <div className="flex gap-4 justify-start items-center">
          <img
            className="h-12 object-cover absolute top-3 left-3 object-center w-12 rounded-full"
            src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png"
            alt="profile"
          />
          <AutoResizeTextarea onChange={onChange} value={value} placeHolder={placeHolder} />
        </div>
      </div>
      <div className="absolute right-3 bottom-3 gap-4 flex justify-end w-full items-center">
        <button onClick={tweetPost} className="px-10 py-2 bg-secondary-btn text-secondary-btn-text font-medium rounded-full">
          {label}
        </button>
      </div>
    </div>
  );
};

export default AddTwitter;
