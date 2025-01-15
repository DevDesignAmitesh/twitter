import Profile from "@/components/Profile";
import { auth } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { user as User } from "../api/actions/user";

const page = async () => {
  const session: any = await getServerSession(auth);
  const email = session?.user?.email;

  const existingUser = await User(email);
  const user = existingUser.user;
  return (
    <>
      <Profile user={user} />
    </>
  );
};

export default page;
