import UserCard from "@/components/dashboard/user-card"
import { getNumberOfPostsByUserId } from "@/server/actions/blogActions"
import { getUserList } from "@/server/actions/userActions"
import { getUserAuth } from "@/server/auth/utils"

export default async function Page() {
  const userList = await getUserList()
  const { session } = await getUserAuth()
  return (
    <>
      <div className="space-y-4 p-4 sm:pt-8 w-full max-w-7xl">
        <div className="space-y-2">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">Change User Roles</h1>
          </div>
          <ul className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userList.filter((user) => user.id !== session?.user.id).map((user) => (
              <UserCard key={user.id} user={user}>
                {getNumberOfPostsByUserId(user.id)}
              </UserCard>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
