"use client";

import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Header from "@/components/CenterScreen/Header";
import UserInfo from "@/components/UserInfo";
import { IoClose } from "react-icons/io5";
import EditInfoBox from "@/components/EditInfoBox";
import UploadImg from "@/components/UploadImg";
import { UpdateUser } from "@/app/api/actions/updateUser";
import { useRouter } from "next/navigation";

const Profile = ({ user }: { user: any }) => {
  const router = useRouter();
  const [panel, setPanel] = useState<boolean>(false);
  const [popup, setPopup] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [formData, setFormData] = useState<any>({
    name: user?.name || "name",
    userName: user.userName || "username",
    description: user.bio || "description",
    profileImg: user.prfileImage || "",
    backgroundImg: user.coverImage || "",
  });

  const name = formData.name;
  const userName = formData.userName;
  const description = formData.description;
  const profileImg = formData.profileImg;
  const backgroundImg = formData.backgroundImg;

  const handleImageChange = (key: string, imageUrl: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: imageUrl,
    }));
  };

  const updateUser = async () => {
    try {
      const res = await UpdateUser(
        name,
        userName,
        description,
        profileImg,
        backgroundImg,
        user.email
      );
      setMessage(res.message);
      router.push("/");
    } catch (error: any) {
      setMessage("error occured");
      console.log(error);
      return;
    }
  };

  return (
    <div className="min-h-screen relative border border-color flex flex-col justify-start items-center w-[100%] md:w-[65%] xl:w-[45%]">
      {popup && (
        <div className="w-full h-auto bg-secondary-btn text-secondary-btn-text rounded-md overflow-hidden absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[300px] flex justify-start items-center gap-10 flex-col px-10 py-5">
          <nav className="w-full flex justify-between items-start">
            <p className="font-semibold text-xl">Edit</p>
            <IoClose
              className="cursor-pointer"
              onClick={() => setPopup(false)}
              size={25}
            />
          </nav>
          <div className="flex justify-center items-center w-full flex-col gap-5">
            <UploadImg
              onImageChange={(imageUrl) =>
                handleImageChange("backgroundImg", imageUrl)
              }
              className="h-[200px]"
              label="Upload Background Image"
              changeLabel="Change Background Image"
            />
            <UploadImg
              onImageChange={(imageUrl) =>
                handleImageChange("profileImg", imageUrl)
              }
              className="h-[100px]"
              label="Upload Profile Image"
              changeLabel="Change Profile Image"
            />
            <EditInfoBox
              label="Name"
              value={formData.name}
              onChange={(e: any) =>
                setFormData((prev: any) => ({ ...prev, name: e.target.value }))
              }
            />
            <EditInfoBox
              label="Username"
              value={formData.userName}
              onChange={(e: any) =>
                setFormData((prev: any) => ({
                  ...prev,
                  userName: e.target.value,
                }))
              }
            />
            <EditInfoBox
              maxLength={100}
              className=""
              label="Description"
              value={formData.description}
              onChange={(e: any) => {
                setFormData((prev: any) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
            />
            {message && <p className="w-full text-center">{message}</p>}
            <button
              onClick={updateUser}
              className="w-full hover:opacity-80 p-3 text-center rounded-md bg-background text-text"
            >
              Submit Changes
            </button>
          </div>
        </div>
      )}
      <div
        className={`h-[200px] absolute z-40 ${
          panel ? "translate-x-0 block" : "translate-x-full hidden"
        } flex flex-col justify-start transition-all duration-200 items-start p-5 sm:hidden right-0 top-0 bottom-0 w-[50%] rounded-l-md bg-secondary-btn text-secondary-btn-text`}
      >
        <RxCross2
          onClick={() => setPanel(false)}
          size={25}
          className=" absolute right-4 top-4 cursor-pointer"
        />
        <div className="flex flex-col gap-4 justify-start items-start w-full">
          <p className="text-lg font-medium cursor-pointer">Home</p>
          <p className="text-lg font-medium cursor-pointer">Notifications</p>
          <p className="text-lg font-medium cursor-pointer">Profile</p>
          <p className="text-lg font-medium cursor-pointer">Log out</p>
        </div>
      </div>
      <Header visible label="Profile" setPanel={setPanel} />
      <UserInfo user={user} setPopup={setPopup} />
    </div>
  );
};

export default Profile;
