import BlogCard from "@/components/blog/blog-card"
import { getPublishedPosts } from "@/server/actions/blogActions"

export default async function Blog() {
  const data = await getPublishedPosts()
  return (
    <>
      <main className="space-y-6 p-4 max-w-7xl mx-auto">
        <div className="space-y-2 mt-16 text-center">
          <p className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
            Featured Posts
          </p>
          <p className="text-muted-foreground">I am trying to build a starter layout kind of thing for my Nextjs projects.</p>
        </div>
        <div className="space-y-2 mx-auto max-w-2xl">
          <ul className="list-inside space-y-4">
            {data.map((item) => (
              <li key={item.id}>
                <BlogCard post={item} />
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}
