import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex flex-col justify-center gap-y-4 max-w-7xl mx-auto mt-8 sm:mt-24">
      <div className="py-2 px-4 space-y-2 mx-auto flex flex-col sm:items-center sm:justify-center w-full">
        <Skeleton className="h-16 w-full lg:w-[980px]" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="py-2 px-4 space-y-2 mx-auto flex flex-col sm:items-center sm:justify-center w-full">
        <Skeleton className="aspect-video h-56 sm:h-auto w-full rounded-md object-cover mb-6" />
      </div>
      <div className="py-2 px-4 space-y-2 mx-auto flex flex-col sm:items-center sm:justify-center w-full">
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="h-10 w-full" />
          ))}
      </div>
    </main>
  )
}
