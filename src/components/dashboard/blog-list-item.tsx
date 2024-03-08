import { SelectBlogs } from "@/server/db/schema/blog";

export default function BlogListItem({ post }: { post: SelectBlogs }) {
  return (
    <>
      {post.title}
    </>
  )
}
