import { getAuthorById } from "@/server/actions/blogActions";
import { SelectBlogs } from "@/server/db/schema/blog";
import Image from "next/image";
import Link from "next/link";
import { LuCalendar } from "react-icons/lu";
import { RxPerson } from "react-icons/rx";

export default async function BlogCard({ post }: { post: SelectBlogs }) {
  const author = await getAuthorById(post.authorId)
  return (
    <div className="rounded-md border space-y-3 h-full w-full hover:bg-secondary bg-card text-card-foreground group">
      <Link href={`/blog/${post.slug}`} className="space-y-2 flex flex-col p-5">
        {
          (post.coverImage?.toString() !== '' && post.coverImage !== null) &&
          <div className="overflow-hidden rounded-md border">
            <Image
              src={post.coverImage}
              alt="cover image"
              height={480}
              width={640}
              className="aspect-video h-56 w-full object-cover group-hover:scale-110 transition-transform"
            />
          </div>
        }
        <h1 className="text-3xl font-bold tracking-tighter">
          {post.title}
        </h1>
        <div className="inline-flex items-start gap-x-4 text-sm text-muted-foreground">
          <span className="flex items-start gap-x-1">
            <LuCalendar size={15} />
            {post.createdAt.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
          <span className="flex items-start gap-x-1">
            <RxPerson size={15} />
            {author.name}
          </span>
        </div>
        <p>
          {post.description}
        </p>
      </Link>
    </div>
  )
}
