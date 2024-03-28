import CommentForm from "@/components/blog/comment-form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getPostBySlug, getUserById } from "@/server/actions/blogActions"
import { getCommentsByPostId } from "@/server/actions/commentActions"
import { getUserAuth } from "@/server/auth/utils"
import { BadgeIcon } from "@radix-ui/react-icons"
import DOMPurify from "isomorphic-dompurify"
import Image from "next/image"
import Link from "next/link"
import { BsFacebook, BsLinkedin, BsReddit, BsTwitterX } from "react-icons/bs"
import { LuFacebook, LuTwitter, LuX } from "react-icons/lu"

export default async function Page({ params }: { params: { slug: string } }) {
  const blogData = await getPostBySlug(params.slug)
  const { session } = await getUserAuth()

  if (blogData.length === 0 || blogData[0].isDraft)
    return (
      <div>404</div>
    )

  const [author] = await getUserById(blogData[0].authorId)
  const blogContent = DOMPurify.sanitize(blogData[0].content)
  const commentData = await getCommentsByPostId(blogData[0].slug)
  return (
    <>
      <main className="max-w-7xl mx-auto mt-2 sm:mt-8">
        <div className="py-2 px-4 space-y-2 mx-auto sm:text-center">
          <div className="text-3xl tracking-tighter sm:text-5xl xl:text-6xl/none font-bold">
            {blogData[0].title}
          </div>
          <div className="text-muted-foreground text-sm">
            By {author.name} | {blogData[0].updatedAt.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })} {blogData[0].updatedAt.toString() !== blogData[0].createdAt.toString() && '(updated)'}
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
        <article className="prose dark:prose-invert mx-auto prose-img:ml-[auto] prose-img:mr-[auto] px-4 mt-6">
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
        <div className="max-w-2xl mx-auto px-4 flex flex-col justify-start mb-3">
          <span className="mb-4">
            Comments ({commentData.length})
          </span>
          {session &&
            <CommentForm session={{ session }} postSlug={params.slug} />
            ||
            <Button asChild>
              <Link href="/sign-in">
                Sign in to comment
              </Link>
            </Button>
          }
          <ul className="mt-4 space-y-4">
            {commentData.map((item) => (
              <li key={item.comments.id} className="bg-secondary/15 p-4 border shadow-sm dark:shadow-primary/15 rounded-md space-y-2">
                <div className="space-x-2">
                  <span className="font-bold max-sm:text-sm">{item.user?.name?.split(' ').slice(0, 2).join(' ')}</span>
                  {
                    blogData[0].authorId === item.user?.id &&
                    <span className="text-xs bg-secondary px-2 py-1 rounded-md border antialiased">Author</span>
                  }
                  <span className="text-muted-foreground text-xs">&bull;</span>
                  <span className="text-muted-foreground max-sm:text-xs text-sm">{item.comments.createdAt.toLocaleString()}</span>
                </div>
                <p>
                  {item.comments.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}
