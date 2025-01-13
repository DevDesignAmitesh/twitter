import React from "react";

const FollowBox = () => {
  return (
    <div className="p-5 w-full border-color flex-col gap-4 flex justify-center items-start border-[1px] rounded-md">
      <h1 className="text-text font-medium">Who to follow?</h1>
      <div className="flex justify-center items-center gap-4">
        <img
          className="h-12 object-cover object-center w-12 rounded-full"
          src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png"
          alt="profile"
        />
        <div className="flex justify-center items-start flex-col">
          <h1 className="text-text text-[16px]">hello</h1>
          <p className="text-gray-500 text-[13px]">@fucucku</p>
        </div>
      </div>
    </div>
  );
};

export default FollowBox;
