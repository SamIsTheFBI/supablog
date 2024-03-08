import Tiptap from "@/components/editor/tiptap";
import { getUserAuth } from "@/server/auth/utils";

export default async function CreatePost() {
  const { session } = await getUserAuth()
  return (
    <>
      <main className="max-w-7xl mx-auto">
        <article className="prose dark:prose-invert max-w-7xl  prose-img:ml-[auto] prose-img:mr-[auto] space-y-2">
          <div className="px-4 py-2">
            <Tiptap session={session} />
          </div>
        </article>
      </main>
    </>
  )
}
