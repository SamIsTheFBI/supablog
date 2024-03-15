import { SelectBlogs } from "@/server/db/schema/blog";
import Image from "next/image";
import Link from "next/link";
import { LuCalendar } from "react-icons/lu";

export default function BlogCard({ post }: { post: SelectBlogs }) {
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
        <h1 className="text-3xl font-bold">
          {post.title}
        </h1>
        <span className="inline-flex items-start gap-x-1 text-sm text-muted-foreground">
          <LuCalendar size={15} />
          {post.createdAt.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
        </span>
        <p>
          {post.description}
        </p>
      </Link>
    </div>
  )
}
