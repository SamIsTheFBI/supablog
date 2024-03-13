import MetadataForm from "@/components/editor/metadata-form";
import Tiptap from "@/components/editor/tiptap";
import { getPostBySlug } from "@/server/actions/blogActions";
import { getUserAuth } from "@/server/auth/utils";

export default async function EditPost({ params }: { params: { slug: string } }) {
  const session = await getUserAuth()
  const blogObj = await getPostBySlug(params.slug)

  if (!blogObj[0]) {
    return (
      <main className="flex">
        <div className="m-auto">
          404 not found
        </div>
      </main>
    )
  }

  if (session.session?.user.id !== blogObj[0].authorId) {
    return (
      <main className="flex">
        <div className="m-auto">
          You&apos;re not authorised to edit this post\!
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto px-4 bg-secondary/55">
      <div className="flex max-lg:flex-wrap-reverse justify-between h-full main-height max-w-7xl mx-auto">
        <section className="prose dark:prose-invert max-w-3xl px-4 py-2 prose-img:ml-[auto] prose-img:mr-[auto] space-y-2 bg-background flex-grow rounded-md m-2 mb-0 shadow-md">
          <Tiptap session={session} blogObj={blogObj[0]} />
        </section>
        <aside className="sm:min-w-96 flex flex-col rounded-md mt-2 pb-6 px-4 max-lg:flex-grow sticky top-14 max-h-main">
          <MetadataForm session={session} blogObj={blogObj[0]} />
        </aside>
      </div>
    </main>
  )
}


