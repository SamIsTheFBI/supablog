"use client"

import { signOutAction } from "@/server/actions/authActions"
import { Button } from "../ui/button"
import { useFormStatus } from "react-dom";

export default function SignOutButton() {
  const { pending } = useFormStatus();
  return (
    <form action={signOutAction}>
      <Button disabled={pending}>Sign Out</Button>
    </form>
  )
}
