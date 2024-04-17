import { getUserById } from "@/server/actions/blogActions";
import { AuthSession, getUserAuth } from "@/server/auth/utils";
import Image from "next/image";

export default async function UserPfpBox() {
  const { session } = await getUserAuth()
  if (!session) return null

  const [userData] = await getUserById(session.user.id)
  const initials = userData.name?.match(/(\b\S)?/g)?.join("").match(/(^\S|\S$)?/g)?.join("").toUpperCase()
  return (
    <div className="max-sm:text-sm w-full max-sm:tracking-tighter tracking-tight sm:px-1">
      <div className="flex justify-between gap-x-4">
        <div className=" text-left flex flex-col justify-center w-4/6">
          <span className="inline-block font-bold">{userData.name !== null && userData.name || ''}</span>
          <span className="inline-block text-xs text-muted-foreground w-full truncate">{session.user.email}</span>
        </div>
        <div className="size-16 min-w-16 rounded-full border border-border inline-flex bg-secondary items-center justify-center text-muted-foreground overflow-clip">
          {userData.avatarUrl
            &&
            <Image
              src={userData.avatarUrl}
              alt="pfp"
              height={64}
              width={64}
              className="aspect-video h-16 object-cover"
            />
            ||
            initials
          }
        </div>
      </div>
    </div>
  )
}
