import { getPostBySlug, getUserById } from "@/server/actions/blogActions"
import DOMPurify from "isomorphic-dompurify"

export default async function Page({ params }: { params: { slug: string } }) {
  const blogData = await getPostBySlug(params.slug)

  if (blogData.length === 0)
    return (
      <div>404</div>
    )

  const authorName = await getUserById(blogData[0].authorId)
  const blogContent = DOMPurify.sanitize(blogData[0].content)
  return (
    <>
      <main className="space-y-8 max-w-7xl mx-auto mt-8">
        <div className="py-2 px-4 space-y-2 mx-auto sm:text-center">
          <div className="text-4xl font-bold">
            {blogData[0].title}
          </div>
          <div className="text-muted-foreground">
            By {authorName} | {blogData[0].updatedAt.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })} {blogData[0].updatedAt.toString() !== blogData[0].createdAt.toString() && '(updated)'}
          </div>
          <div>
          </div>
        </div>
        <article className="prose dark:prose-invert mx-auto prose-img:ml-[auto] prose-img:mr-[auto] px-4">
          <div dangerouslySetInnerHTML={{ __html: blogContent }}></div>
        </article>
      </main>
    </>
  )
}
