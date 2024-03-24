import BlogListItem from "@/components/dashboard/blog-list-item"
import { getPostsByUserId, getRecentPosts } from "@/server/actions/blogActions"
import { getUserAuth } from "@/server/auth/utils"

export default async function DashboardPostsPage() {
  const { session } = await getUserAuth()
  if (!session) return null

  const postData = await getPostsByUserId(session.user.id)
  return (
    <>
      <div className="space-y-4 p-4 w-full max-w-7xl">
        <div className="space-y-2">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">Your Posts: </h1>
          </div>
          <ul className="space-y-2 w-full">
            {postData.map((post) => (
              <li key={post.id}><BlogListItem post={post} /></li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
