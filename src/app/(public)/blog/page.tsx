import BlogCard from "@/components/blog/blog-card"
import { Button } from "@/components/ui/button"
import { getPostsByOffset, getPublishedPosts, getPublishedPostsCount } from "@/server/actions/blogActions"
import { LuArrowLeft, LuArrowRight } from "react-icons/lu"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"

export default async function Blog({
  searchParams
}: {
  searchParams: { [key: string]: number | undefined }
}) {
  const limit = 4
  const visiblePaginationCnt = 3
  const offset = searchParams.page && (searchParams.page - 1) * limit || 0
  const data = await getPostsByOffset(offset, limit)
  const count = await getPublishedPostsCount()
  const pageCnt = Math.ceil(count / limit);

  function getPrevPage() {
    {
      if (searchParams.page) {
        if (searchParams.page > 1) {
          return Number(searchParams.page) - 1;
        }
      }

      return -1
    }
  }

  function getNextPage() {
    {
      if (searchParams.page) {
        if (searchParams.page < pageCnt) {
          return Number(searchParams.page) + 1;
        }
      }

      return -1
    }
  }
  const nextPage = getNextPage()
  const prevPage = getPrevPage()
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
        {}
        <Pagination className={cn(visiblePaginationCnt > pageCnt && "hidden")}>
          <PaginationContent>
            {prevPage > -1 &&
              <PaginationItem>
                <PaginationPrevious href={`/blog?page=${prevPage}`} />
              </PaginationItem>
            }
            {
              (pageCnt > visiblePaginationCnt + 1 && Number(searchParams.page) - visiblePaginationCnt > 0) &&
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            }
            {Array(pageCnt)
              .fill(0)
              .map((_, idx) => (
                <PaginationItem key={idx}>
                  <PaginationLink
                    href={`/blog?page=${idx + 1}`}
                    isActive={Number(searchParams.page) === idx + 1}
                    className={cn(
                      !(Number(searchParams.page) === idx + 1) && "text-muted-foreground" || "",
                      Number(searchParams.page) - visiblePaginationCnt >= idx + 1 && "hidden",
                      Number(searchParams.page) + visiblePaginationCnt <= idx + 1 && "hidden",
                    )}
                  >
                    {idx + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            {
              (pageCnt > visiblePaginationCnt + 1 && Number(searchParams.page) + visiblePaginationCnt <= pageCnt) &&
              <PaginationItem>
                <PaginationEllipsis />
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
