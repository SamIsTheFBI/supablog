import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="space-y-4 p-4 sm:pt-8 w-full max-w-7xl">
      <Skeleton className="h-12 w-full" />
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
