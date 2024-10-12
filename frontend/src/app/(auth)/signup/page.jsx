import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Signup from "@/components/signup/signup";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/my-library/favorites");
  }

  return <Signup />;
}
