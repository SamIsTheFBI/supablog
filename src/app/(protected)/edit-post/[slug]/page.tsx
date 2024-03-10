import Tiptap from "@/components/editor/tiptap";
import { getPostBySlug } from "@/server/actions/blogActions";
import { getUserAuth } from "@/server/auth/utils";

export default async function EditPost({ params }: { params: { slug: string } }) {
  const session = await getUserAuth()
  const blogObj = await getPostBySlug(params.slug)
  return (
    <>
      <main className="max-w-7xl mx-auto">
        <article className="prose dark:prose-invert max-w-7xl prose-img:ml-[auto] prose-img:mr-[auto] space-y-2">
          <div className="px-4 py-2">
            <Tiptap session={session} blogObj={blogObj[0]} />
          </div>
        </article>
      </main>
    </>
  )
}


