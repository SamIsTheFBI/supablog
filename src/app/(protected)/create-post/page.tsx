import MetadataForm from "@/components/editor/metadata-form";
import Tiptap from "@/components/editor/tiptap";
import { getUserAuth } from "@/server/auth/utils";

export default async function CreatePost() {
  const session = await getUserAuth()
  return (
    <main className="mx-auto px-4 bg-secondary/55">
      <div className="flex max-lg:flex-wrap-reverse justify-between h-full main-height max-w-7xl mx-auto">
        <section className="prose dark:prose-invert max-w-3xl px-4 py-2 prose-img:ml-[auto] prose-img:mr-[auto] space-y-2 bg-background flex-grow rounded-md m-2 mb-0 shadow-md">
          <Tiptap session={session} />
        </section>
        <aside className="sm:min-w-96 flex flex-col rounded-md mt-2 px-4 py-2 max-lg:flex-grow lg:sticky top-14 max-h-main shadow-sm bg-background border ">
          <MetadataForm session={session} />
        </aside>
      </div>
    </main>
  )
}
