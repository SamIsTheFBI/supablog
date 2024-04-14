import BlogCard from "@/components/blog/blog-card"
import { getPostsByOffset, getPublishedPostsCount } from "@/server/actions/blogActions"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"

export default async function Blog({
  searchParams
}: {
  searchParams: { [key: string]: number | undefined }
}) {
  const POST_PER_PAGE = 4
  const visiblePaginationCnt = 3
  const offset = searchParams.page && (searchParams.page - 1) * POST_PER_PAGE || 0
  const data = await getPostsByOffset(offset, POST_PER_PAGE)
  const count = await getPublishedPostsCount()
  const pageCnt = Math.ceil(count / POST_PER_PAGE);

  if (searchParams.page) {
    if (searchParams.page > pageCnt || searchParams.page < 0) {
      return <div>404</div>
    }
  }

  function getPrevPage() {
    if (searchParams.page) {
      if (searchParams.page > 1) {
        return Number(searchParams.page) - 1;
      }
    }

    return -1
  }

  function getNextPage() {
    if (searchParams.page) {
      if (searchParams.page < pageCnt) {
        return Number(searchParams.page) + 1;
      }

      return -1
    }

    return 2
  }
  const nextPage = getNextPage()
  const prevPage = getPrevPage()
  console.log(nextPage)
  return (
    <>
      <main className="space-y-6 p-4 max-w-7xl mx-auto">
        <div className="space-y-2 sm:mt-12 text-center">
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
        {}
        <Pagination className={cn("mx-auto max-w-2xl")}>
          <PaginationContent className={cn("flex justify-between items-center w-full", prevPage < 1 && "justify-end", nextPage < 1 && "justify-start")}>
            {prevPage > -1 &&
              <PaginationItem>
                <PaginationPrevious href={`/blog?page=${prevPage}`} />
              </PaginationItem>
            }
            {nextPage > -1 &&
              <PaginationItem>
                <PaginationNext href={`/blog?page=${nextPage}`} />
              </PaginationItem>
            }
          </PaginationContent>
        </Pagination>
      </main>
    </>
  )
}
