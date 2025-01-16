import Profile from "@/components/Profile";
import { auth } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { user as User } from "../api/actions/user";
import { redirect } from "next/navigation";

const page = async () => {
  const session: any = await getServerSession(auth);
  if(!session){
    redirect("/auth")
  }
  const email = session?.user?.email;

  const existingUser = await User(email);
  return (
    <>
      <Profile user={existingUser.user} />
    </>
  );
};

export default page;
