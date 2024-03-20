import { getPostBySlug, getUserById } from "@/server/actions/blogActions"
import DOMPurify from "isomorphic-dompurify"
import Image from "next/image"
import { BsFacebook, BsLinkedin, BsReddit, BsTwitterX } from "react-icons/bs"
import { LuFacebook, LuTwitter, LuX } from "react-icons/lu"

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
      <main className="max-w-7xl mx-auto mt-2 sm:mt-8">
        <div className="py-2 px-4 space-y-2 mx-auto sm:text-center">
          <div className="text-3xl tracking-tighter sm:text-5xl xl:text-6xl/none font-bold">
            {blogData[0].title}
          </div>
          <div className="text-muted-foreground text-sm">
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
            /> ||
            <div className="mb-4 max-w-2xl mx-auto">
              <div className="inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
            </div>
          }
        </div>
        <article className="prose dark:prose-invert mx-auto prose-img:ml-[auto] prose-img:mr-[auto] px-4 -mt-4">
          <div dangerouslySetInnerHTML={{ __html: blogContent }}></div>
        </article>
        <div className="max-w-2xl mx-auto px-4">
          <div className="inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="mx-auto pt-4 flex items-center gap-x-4 text-primary">
            <span className="px-3 bg-secondary text-sm py-1 rounded-full border">#TODOtags</span>
          </div>
          <div className="mx-auto py-4 flex items-center gap-x-4 text-primary">
            Share this:
            <div className="border p-2 rounded-md hover:bg-secondary">
              <BsTwitterX />
            </div>
            <div className="border p-2 rounded-md hover:bg-secondary">
              <BsReddit />
            </div>
            <div className="border p-2 rounded-md hover:bg-secondary">
              <BsLinkedin />
            </div>
            <div className="border p-2 rounded-md hover:bg-secondary">
              <BsFacebook />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
