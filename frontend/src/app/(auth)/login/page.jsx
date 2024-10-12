import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Login from "@/components/login/login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/my-library/favorites");
  }

  return <Login />;
}
