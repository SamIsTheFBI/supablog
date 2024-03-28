import MetadataForm from "@/components/editor/metadata-form";
import Tiptap from "@/components/editor/tiptap";
import Sidebar from "@/components/layout/sidebar";
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
    <main className="mx-auto px-4 bg-secondary">
      <div className="max-lg:pt-4 md:flex max-lg:flex-wrap-reverse justify-center h-full main-height max-w-7xl mx-auto max-md:gap-y-4">
        <section className="lg:px-4">
          <Tiptap session={session} blogObj={blogObj[0]} />
        </section>
        <aside>
          <MetadataForm session={session} blogObj={blogObj[0]} />
        </aside>
      </div>
    </main>
  )
}
