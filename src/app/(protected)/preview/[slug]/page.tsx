import CommentCard from "@/components/blog/comment-card"
import CommentForm from "@/components/blog/comment-form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { env } from "@/env"
import { getPostBySlug, getUserById } from "@/server/actions/blogActions"
import { getCommentsByPostId } from "@/server/actions/commentActions"
import { getUserAuth } from "@/server/auth/utils"
import { BadgeIcon } from "@radix-ui/react-icons"
import DOMPurify from "isomorphic-dompurify"
import { Metadata, ResolvingMetadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { BsFacebook, BsLinkedin, BsReddit, BsTwitterX } from "react-icons/bs"

type Props = {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const [post] = await getPostBySlug(params.slug)
  const [author] = await getUserById(post.authorId)

  if (!author || !post) {
    const boringMetadata = await parent
    return boringMetadata as Metadata
  }

  const postUrl = `${env.LUCIA_AUTH_URL}/blog/${post.slug}`

  const title = post.title || 'No Title'
  const description = post.description || ''
  const authorName = author.name || 'Anonymous'
  const date = post.createdAt || '2022-11-08T12:00:00.000Z'
  const cover = post.coverImage || `${env.LUCIA_AUTH_URL}/MUNSOClogo.png`

  const imageUrl = env.LUCIA_AUTH_URL + '/api/og?'
    + 'title=' + encodeURIComponent(title)
    + '&author=' + encodeURIComponent(authorName)
    + '&date=' + encodeURIComponent(date.toJSON())
    + '&cover=' + cover

  const metadata: Metadata = {
    title: title + ' • MUNSOC NITA',
    description: description,

    twitter: {
      card: 'summary_large_image',
      title: title + ' • MUNSOC NITA',
      description: description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 628,
          type: 'image/png',
          alt: '',
        }
      ],
    },
    openGraph: {
      title: title + ' • MUNSOC NITA',
      description: description,
      type: 'article',
      locale: 'en-US',
      url: postUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 628,
          type: 'image/png',
          alt: '',
        }
      ],
    },
  }

  return metadata
}

export default async function Page({ params }: { params: { slug: string } }) {
  const blogData = await getPostBySlug(params.slug)
  const { session } = await getUserAuth()

  if (blogData.length === 0 || blogData[0].isApproved)
    return (
      <div>404</div>
    )

  const [author] = await getUserById(blogData[0].authorId)
  const blogContent = DOMPurify.sanitize(blogData[0].content)

  return (
    <>
      <main className="max-w-7xl mx-auto mt-8 sm:mt-24">
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
              className="aspect-video h-56 sm:h-auto w-full max-w-7xl mx-auto rounded-md border border-border object-cover shadow-md mb-6"
              priority
            /> ||
            <div className="mb-4 max-w-2xl mx-auto">
              <div className="inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
            </div>
          }
        </div>
        <article className="prose dark:prose-invert mx-auto prose-img:ml-[auto] prose-img:mr-[auto] px-4 prose-a:text-primary prose-blockquote:border-l-primary">
          <div dangerouslySetInnerHTML={{ __html: blogContent }}></div>
        </article>
      </main>
    </>
  )
}
