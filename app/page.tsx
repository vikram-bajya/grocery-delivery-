import Image from "next/image";
import Register from "./registers/page";
import connectDb from "@/lib/db";

import { auth } from "./auth";
import { redirect } from "next/navigation";
import User from "@/models/user.model";
import EditRoleMobile from "@/components/EditRoleMobile";
import Nav from "@/components/nav";

async function Home() {
  await connectDb();
  const session = await auth();
  const user = await User.findById(session?.user?.id);
  if (!user) {
    redirect("/login");
  }

  const inComplete = !user.mobile || !user.role;
  if (inComplete) {
    return <EditRoleMobile />;
  }
  const plainUser = JSON.parse(JSON.stringify(user));
  return (
    <>
      <Nav user={plainUser} />
    </>
  );
}

export default Home;
