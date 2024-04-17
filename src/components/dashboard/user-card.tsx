"use client"

import { SelectUsers } from "@/server/db/schema/auth";
import Image from "next/image";
import { LuPenTool, LuShieldCheck } from "react-icons/lu";
import { Button } from "../ui/button";
import { demoteToAuthor, promoteToAdmin } from "@/server/actions/userActions";
import { useFormState } from "react-dom";

function PromoteForm({ userId }: { userId: string }) {
  const [state, formAction] = useFormState(promoteToAdmin, {
    error: "",
  })

  return (
    <form action={formAction}>
      <input hidden value={userId} name="user_id" />
      <Button type="submit">Promote to Admin</Button>
    </form>
  )
}

function DemoteForm({ userId }: { userId: string }) {
  const [state, formAction] = useFormState(demoteToAuthor, {
    error: "",
  })

  return (
    <form action={formAction}>
      <input hidden value={userId} name="user_id" />
      <Button type="submit" variant="destructive">Demote to Author</Button>
    </form>
  )
}

export default function UserCard({ user, children }: { user: SelectUsers, children?: React.ReactNode }) {

  return (
    <li className="border border-border p-4 rounded-md h-full space-y-4 hover:bg-secondary/55">
      <div className="w-full tracking-tight sm:px-1">
        <div className="flex justify-between gap-x-2">
          <div className="size-14 min-w-14 rounded-full border border-border inline-flex bg-secondary items-center justify-center text-muted-foreground overflow-clip">
            {user.avatarUrl
              &&
              <Image
                src={user.avatarUrl}
                alt="pfp"
                height={64}
                width={64}
                className="aspect-square h-14 object-cover"
              />
              ||
              user.name?.match(/(\b\S)?/g)?.join("").match(/(^\S|\S$)?/g)?.join("").toUpperCase()
            }
          </div>
          <div className=" text-left flex flex-col justify-center w-4/6">
            <span className="inline-block font-bold">{user.name !== null && user.name || ''}</span>
            <span className="inline-block text-sm text-muted-foreground w-full truncate">{user.email}</span>
          </div>
          <div className="border border-border rounded-md w-min text-left flex flex-col justify-center items-center px-4 py-2 bg-background">
            <span className="inline-block font-bold">{children}</span>
            <span className="inline-block text-muted-foreground">Posts</span>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-between gap-x-4">
        <div className="flex items-center gap-x-2 border border-border px-2 py-1 rounded-md text-sm w-min bg-background">
          {user.isAdmin && <><LuShieldCheck /> Admin</> || <><LuPenTool /> Author</>}
        </div>
        {user.isAdmin &&
          <DemoteForm userId={user.id} />
          ||
          <PromoteForm userId={user.id} />
        }
      </div>
    </li>
  )
}
