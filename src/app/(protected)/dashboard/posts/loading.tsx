import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="space-y-4 p-4 sm:pt-8 w-full max-w-7xl">
      <div className="flex items-center w-full justify-between">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-12 w-28" />
      </div>
      <div className="space-y-2">
        {Array(15)
          .fill(0)
          .map((_, idx) => (
            <Skeleton key={idx} className="h-10 w-full" />
          ))
        }
      </div>
    </main>
  )
}

