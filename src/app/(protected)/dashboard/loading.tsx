import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex flex-col items-center gap-y-4 w-full mt-8">
      <Skeleton className="h-16 w-full" />
      <div className="py-2 mx-auto flex items-center gap-4 w-full">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="h-40 w-80" />
          ))}
      </div>
      <div className="flex justify-start w-full">
        <Skeleton className="h-9 w-24" />
      </div>
    </main>
  )
}
