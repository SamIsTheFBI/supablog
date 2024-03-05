import SignOutButton from "@/components/auth/SignOutButton"
import Quill from "@/components/editor/quill"
import Tiptap from "@/components/editor/tiptap"
import { getUserAuth } from "@/server/auth/utils"

export default async function DashboardPage() {
  const { session } = await getUserAuth()
  return (
    <>
      <main className="space-y-2 p-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold">User Data</h1>
        <pre className="bg-secondary p-2 rounded-md overflow-auto">
          {JSON.stringify(session, null, 2)}
        </pre>
        <SignOutButton />
        <article className="prose dark:prose-invert max-w-7xl">
          <h2>Tiptap Editor</h2>
          <div className="border px-4 py-2">
            <Tiptap />
          </div>
        </article>
      </main>
    </>
  )
}
