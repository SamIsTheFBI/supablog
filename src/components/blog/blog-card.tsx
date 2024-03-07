import { SelectBlogs } from "@/server/db/schema/blog";
import Link from "next/link";

export default function BlogCard({ post }: { post: SelectBlogs }) {
  return (
    <div className="p-5 rounded-md border space-y-3 h-full w-full hover:bg-secondary bg-card text-card-foreground">
      <Link href={`/blog/${post.slug}`}>
        <h1 className="text-3xl font-bold">
          {post.title}
        </h1>
      </Link>
      <p>
        {post.description}
      </p>

    </div>
  )
}
