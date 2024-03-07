import SignOutButton from "@/components/auth/SignOutButton"
import Quill from "@/components/editor/quill"
import Tiptap from "@/components/editor/tiptap"
import { getPostsByUserId } from "@/server/actions/blogActions"
import { getUserAuth } from "@/server/auth/utils"

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
          <h1 className="text-2xl font-bold">Your Posts: </h1>
          <ul className="list-disc list-inside">
            {data.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </div>
        <article className="prose dark:prose-invert max-w-7xl  prose-img:ml-[auto] prose-img:mr-[auto] space-y-2">
          <h2>Tiptap Editor</h2>
          <div className="border px-4 py-2">
            <Tiptap session={session} />
          </div>
        </article>
      </main>
    </>
  )
}
