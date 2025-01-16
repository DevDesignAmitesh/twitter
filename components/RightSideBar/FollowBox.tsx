import Link from "next/link";
import React from "react";

const FollowBox = ({ user }: { user: any }) => {
  return (
    <>
      <div key={user?.id} className="flex justify-center items-center gap-4">
        <img
          className="h-12 object-cover object-center w-12 rounded-full"
          src={
            user?.prfileImage ||
            "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png"
          }
          alt="profile"
        />
        <Link
          href={`/view/${user.id}`}
          className="flex justify-center hover:border-b-[1px] border-color gap-2 items-center"
        >
          <h1 className="text-text text-[16px]">{user?.name}</h1>
          <p className="text-gray-500 text-[13px]">{user?.userName}</p>
        </Link>
      </div>
    </>
  );
};

export default FollowBox;
