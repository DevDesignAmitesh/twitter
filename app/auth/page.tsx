"use client";

import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import Header from "@/components/CenterScreen/Header";
import InputBox from "@/components/InputBox";
import { register } from "../api/actions/register";
import { signIn } from "next-auth/react";

const page = () => {
  const [panel, setPanel] = useState<boolean>(false);
  const [authentication, setAuthentication] = useState<string>("register");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({
    email: "",
    name: "",
    userName: "",
    password: "",
  });
  const router = useRouter();
  const email = formData.email;
  const password = formData.password;

  const handleLogin = async () => {
    try {
      setError("");
      setLoading(true);
      signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/",
      });
      router.push("/");
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleRegiter = async () => {
    setError("");
    setLoading(true);
    const res = await register(formData);
    if (res.success === false) {
      setError(res.message);
      setLoading(false);
      return;
    }
    handleLogin();
    router.push("/");
    setLoading(false);
  };

  return (
    <div className="min-h-screen relative border border-color flex flex-col justify-start items-center w-[100%] md:w-[65%] xl:w-[45%]">
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
      <Header visible label="Authentication" setPanel={setPanel} />
      <div className="w-full h-auto flex flex-col justify-center items-start">
        <div className="w-full h-full flex flex-col items-center gap-10 justify-between px-10 py-5">
          <div className="flex w-full justify-between items-center">
            <h1 className="text-2xl font-semibold">
              {authentication === "register" ? "Register" : "Login"}
            </h1>
          </div>
          <div className="flex w-full flex-col gap-4 justify-start items-center">
            <InputBox
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              label="Email"
            />
            {authentication === "register" && (
              <>
                <InputBox
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  label="Name"
                />
                <InputBox
                  value={formData.userName}
                  onChange={(e) =>
                    setFormData({ ...formData, userName: e.target.value })
                  }
                  label="Username"
                />
              </>
            )}
            <InputBox
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              label="Password"
            />
          </div>
          <div className="flex flex-col gap-5 justify-center items-center w-full">
            {error && <p className="text-red-500">{error}</p>}
            <button
              onClick={() =>
                authentication === "register" ? handleRegiter() : handleLogin()
              }
              className="w-full p-2 bg-secondary-btn text-secondary-btn-text rounded-full"
            >
              {loading
                ? "Loading..."
                : authentication === "register"
                ? "Register"
                : "Login"}
            </button>
            <h1 className="text-gray-500">
              {authentication === "register"
                ? "Already have an account?"
                : "Don't have an account?"}
              <span
                onClick={() =>
                  authentication === "register"
                    ? setAuthentication("login")
                    : setAuthentication("register")
                }
                className="font-semibold text-text hover:underline cursor-pointer"
              >
                {authentication === "register" ? "Login" : "Register"}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
