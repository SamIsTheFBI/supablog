"use client"

import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { AuthSession } from "@/server/auth/utils"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { updateUser } from "@/server/actions/authActions"
import { useFormState, useFormStatus } from "react-dom"

const formSchema = z.object({
  username: z.string().min(2).max(50),
})

export default function UserDataForm({ session }: { session: AuthSession }) {
  const actualSession = session.session

  if (!actualSession) return null

  const { pending } = useFormStatus()
  const [state, formAction] = useFormState(updateUser, {
    error: ""
  })

  return (
    <div>
      <form className="flex flex-col max-w-sm" action={formAction}>
        <Input type="text" name="name" placeholder={actualSession.user.name} />
        <Button disabled={pending}>Updat{pending && 'ing' || 'e'} Info</Button>
      </form>
    </div>
  )
}
