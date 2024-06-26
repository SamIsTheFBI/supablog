import SignOutButton from "@/components/auth/SignOutButton"
import BlogListItem from "@/components/dashboard/blog-list-item"
import UserDataForm from "@/components/dashboard/user-data-form"
import { Button } from "@/components/ui/button"
import { getAllPosts, getPostsByUserId, getRecentPosts, getUnapprovedPosts, getUserById } from "@/server/actions/blogActions"
import { getUserAuth } from "@/server/auth/utils"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PiNotePencil, PiNotebookDuotone } from "react-icons/pi";
import { LuUser, LuUserCog, LuUsers } from "react-icons/lu"
import UnapprovedBlogItem from "@/components/dashboard/unapproved-post"
import { SelectUsers } from "@/server/db/schema/auth"

export default async function DashboardPage() {
  const { session } = await getUserAuth()
  const unapprovedPosts = await getUnapprovedPosts()
  const [userDetails] = await getUserById(session?.user.id as string)
  return (
    <>
      <div className="space-y-4 p-4 sm:pt-8 max-w-7xl w-full">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl xl:text-4xl tracking-tighter font-bold">Welcome back, {session?.user.name?.replace(/ .*/, '')} 👋</h1>
          <p className="text-muted-foreground text-sm leading-tight">You&apos;re logged in as {session?.user.email}</p>
        </div>
        <ul className="gap-y-4 gap-x-6 xl:grid xl:grid-cols-3 xl:grid-rows-1 flex flex-wrap">
          <li>
            <Link href="/create-post" className="h-full bg-secondary/55 border border-border hover:border-primary outline-primary py-2 px-4 rounded-md overflow-auto space-y-3 space-x-6 flex items-center max-w-sm hover:cursor-pointer hover:bg-secondary">
              <div className="bg-background dark:bg-secondary p-4 rounded-full antialiased shadow-md dark:shadow-background">
                <PiNotePencil size={34} />
              </div>
              <div className="flex flex-col space-y-2">
                <span className="font-bold tracking-tighter leading-tight">
                  Create a new Post
                </span>
                <p className="text-pretty text-sm text-muted-foreground pb-3 leading-tight">
                  Embrace the power of expression and join the conversation by creating your next captivating post!
                </p>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/posts" className="h-full bg-secondary/55 border border-border hover:border-primary outline-primary py-2 px-4 rounded-md overflow-auto space-y-3 space-x-6 flex items-center max-w-sm hover:cursor-pointer hover:bg-secondary">
              <div className="bg-background dark:bg-secondary p-4 rounded-full antialiased shadow-md dark:shadow-background">
                <PiNotebookDuotone size={34} />
              </div>
              <div className="flex flex-col space-y-2">
                <span className="font-bold tracking-tighter leading-tight">
                  View Your Posts
                </span>
                <p className="text-pretty text-sm text-muted-foreground pb-3 leading-tight">
                  Seeking inspiration? Take a stroll down memory lane and revisit your past posts.
                </p>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/profile" className="h-full bg-secondary/55 border border-border hover:border-primary outline-primary py-2 px-4 rounded-md overflow-auto space-y-3 space-x-6 flex items-center max-w-sm hover:cursor-pointer hover:bg-secondary">
              <div className="bg-background dark:bg-secondary p-4 rounded-full antialiased shadow-md dark:shadow-background">
                <LuUserCog size={34} />
              </div>
              <div className="flex flex-col space-y-2">
                <span className="font-bold tracking-tighter leading-tight">
                  Update your Profile
                </span>
                <p className="text-pretty text-sm text-muted-foreground pb-3 leading-tight">
                  Update your name, share your interests, your dreams. Let the readers know you better!
                </p>
              </div>
            </Link>
          </li>
          {userDetails.isAdmin &&
            <li>
              <Link href="/dashboard/manage-users" className="h-full bg-secondary/55 border border-border hover:border-primary outline-primary py-2 px-4 rounded-md overflow-auto space-y-3 space-x-6 flex items-center max-w-sm hover:cursor-pointer hover:bg-secondary">
                <div className="bg-background dark:bg-primary dark:text-black p-4 rounded-full antialiased shadow-md dark:shadow-background">
                  <LuUsers size={34} />
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="font-bold tracking-tighter leading-tight">
                    Manage Your Authors
                  </span>
                  <p className="text-pretty text-sm text-muted-foreground pb-3 leading-tight">
                    Manage your community of authors by choosing who gets to publish posts.
                  </p>
                </div>
              </Link>
            </li>
          }
        </ul>
        <SignOutButton />
        {userDetails.isAdmin && <h1 className="text-2xl tracking-tighter font-bold">Recent posts by authors:</h1>}
        {userDetails.isAdmin && unapprovedPosts.map((post) => (
          <UnapprovedBlogItem key={post.blogs.id} post={post.blogs} author={post.user as SelectUsers} />
        ))}
      </div>
    </>
  )
}
