"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function SignoutButton() {
  return (
    <Button className="ml-auto" onClick={signOut}>
      Logout
    </Button>
  );
}
