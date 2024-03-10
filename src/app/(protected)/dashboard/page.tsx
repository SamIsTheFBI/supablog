import SignOutButton from "@/components/auth/SignOutButton"
import BlogListItem from "@/components/dashboard/blog-list-item"
import { Button } from "@/components/ui/button"
import { getPostsByUserId } from "@/server/actions/blogActions"
import { getUserAuth } from "@/server/auth/utils"
import Link from "next/link"

export default async function DashboardPage() {
  const { session } = await getUserAuth()
  const data = await getPostsByUserId(session?.user.id as string)
  return (
    <>
      <main className="space-y-8 p-4 max-w-7xl mx-auto">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">User Data</h1>
          <pre className="bg-secondary p-2 rounded-md overflow-auto">
            {JSON.stringify(session, null, 2)}
          </pre>
          <SignOutButton />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">Your Posts: </h1>
            <Button className="font-bold" asChild><Link href="/create-post">Create Post</Link></Button>
          </div>
          <ul className="space-y-2">
            {data.map((post) => (
              <li key={post.id}><BlogListItem post={post} /></li>
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}
