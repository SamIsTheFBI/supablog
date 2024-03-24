import BlogListItem from "@/components/dashboard/blog-list-item"
import UserDataForm from "@/components/dashboard/user-data-form"
import { getPostsByUserId, getRecentPosts, getUserById } from "@/server/actions/blogActions"
import { getUserAuth } from "@/server/auth/utils"

export default async function DashboardAccountPage() {
  const { session } = await getUserAuth()
  if (!session) return null

  const [userData] = await getUserById(session.user.id)
  return (
    <>
      <div className="space-y-4 p-4 w-full max-w-7xl">
        <div className="space-y-2">
          <div className="border-b pb-4">
            <h1 className="text-2xl font-bold">Profile</h1>
            <p className="text-muted-foreground text-sm">This is how others will see you on the site.</p>
          </div>
        </div>
        <div>
          <UserDataForm session={{ session }} userData={userData} />
        </div>
      </div>
    </>
  )
}

