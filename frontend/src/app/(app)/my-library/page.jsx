import { redirect } from "next/navigation";

export default function MyLibraryPage() {
  return redirect("/my-library/favorites");
}
