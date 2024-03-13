import { SelectBlogs } from "@/server/db/schema/blog";
import Link from "next/link";
import { LuCalendar } from "react-icons/lu";

export default function BlogCard({ post }: { post: SelectBlogs }) {
  return (
    <div className="p-5 rounded-md border space-y-3 h-full w-full hover:bg-secondary bg-card text-card-foreground">
      <Link href={`/blog/${post.slug}`}>
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
