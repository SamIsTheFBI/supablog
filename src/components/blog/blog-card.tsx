import { SelectBlogs } from "@/server/db/schema/blog";
import Image from "next/image";
import Link from "next/link";
import { LuCalendar } from "react-icons/lu";

export default function BlogCard({ post }: { post: SelectBlogs }) {
  return (
    <div className="p-5 rounded-md border space-y-3 h-full w-full hover:bg-secondary bg-card text-card-foreground">
      <Link href={`/blog/${post.slug}`}>
        <div>
          {
            (post.coverImage?.toString() !== '' && post.coverImage !== null) &&
            <Image
              src={post.coverImage}
              alt="cover image"
              height={352}
              width={360}
              className="aspect-video h-56 p-2 bg-secondary rounded-md border object-cover"
            />
          }
        </div>
        <h1 className="text-3xl font-bold">
          {post.title}
        </h1>
      </Link>
      <span className="inline-flex items-start gap-x-1 text-sm text-muted-foreground">
        <LuCalendar size={15} />
        {post.createdAt.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
      </span>
      <p>
        {post.description}
      </p>

    </div>
  )
}
