import { getPostBySlug, getUserById } from "@/server/actions/blogActions"
import DOMPurify from "isomorphic-dompurify"
import Image from "next/image"

export default async function Page({ params }: { params: { slug: string } }) {
  const blogData = await getPostBySlug(params.slug)

  if (blogData.length === 0 || blogData[0].isDraft)
    return (
      <div>404</div>
    )

  const authorName = await getUserById(blogData[0].authorId)
  const blogContent = DOMPurify.sanitize(blogData[0].content)
  return (
    <>
      <main className="space-y-8 max-w-7xl mx-auto mt-8">
        <div className="py-2 px-4 space-y-2 mx-auto sm:text-center">
          <div className="text-3xl tracking-tighter sm:text-5xl xl:text-6xl/none font-bold">
            {blogData[0].title}
          </div>
          <div className="text-muted-foreground">
            By {authorName} | {blogData[0].updatedAt.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })} {blogData[0].updatedAt.toString() !== blogData[0].createdAt.toString() && '(updated)'}
          </div>
          {
            (blogData[0].coverImage?.toString() !== '' && blogData[0].coverImage !== null) &&
            <Image
              src={blogData[0].coverImage}
              alt="cover image"
              height={720}
              width={1280}
              className="aspect-video h-56 sm:h-auto w-full max-w-7xl mx-auto rounded-md border object-cover shadow-md mb-6"
            />
          }
        </div>
        <article className="prose dark:prose-invert mx-auto prose-img:ml-[auto] prose-img:mr-[auto] px-4">
          <div dangerouslySetInnerHTML={{ __html: blogContent }}></div>
        </article>
        <div className="border-t mx-auto max-w-2xl py-6">
          Share this:
        </div>
      </main>
    </>
  )
}
