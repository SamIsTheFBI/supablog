import { getPostBySlug } from "@/server/actions/blogActions"
import DOMPurify from "isomorphic-dompurify"

export default async function Page({ params }: { params: { slug: string } }) {
  const blogData = await getPostBySlug(params.slug)
  const blogContent = DOMPurify.sanitize(blogData[0].content)
  return (
    <>
      <main className="space-y-8 max-w-7xl mx-auto mt-8">
        <pre className="bg-secondary p-2 rounded-md overflow-clip">
          {blogData[0].title}
        </pre>
        <article className="prose dark:prose-invert mx-auto prose-img:ml-[auto] prose-img:mr-[auto]">
          <div dangerouslySetInnerHTML={{ __html: blogContent }}></div>
        </article>
      </main>
    </>
  )
}
