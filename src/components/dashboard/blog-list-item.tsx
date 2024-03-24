"use client"

import { SelectBlogs } from "@/server/db/schema/blog";
import { LuPencil } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";
import Link from "next/link";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { deletePost } from "@/server/actions/blogActions";
import { Input } from "../ui/input";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { cn, dateFormatter } from "@/lib/utils";

export default function BlogListItem({ post }: { post: SelectBlogs }) {
  const [state, formAction] = useFormState(handleDeletePost, {
    error: "",
  })

  async function handleDeletePost(currentState: { error: string }, formData: FormData) {
    const slug = formData.get('slug') as string
    const error = await deletePost(slug)
    if (error === undefined) {
      toast.success("Successfully deleted the post!")
    } else {
      toast.error("An error occurred.")
    }
    return error
  }
  return (
    <>
      <div className="px-4 py-2 border rounded-sm flex justify-between items-center text-wrap gap-2 hover:bg-secondary">
        <div className="inline-flex justify-between items-center flex-grow mr-4 lg:mr-16 max-sm:flex-wrap w-full">
          <Link href={`/edit-post/${post.slug}`} className={`hover:underline group underline-offset-2 inline-flex gap-x-2 items-center ${post.isDraft && `decoration-muted-foreground`}`}>
            <span className="text-muted-foreground text-sm group-hover:flex hidden">
              <LuPencil />
            </span>
            <span className={cn(post.isDraft && 'text-muted-foreground', "max-w-md text-pretty sm:truncate")}>{post.title}</span>
          </Link>
          <span className="text-muted-foreground text-sm max-sm:text-xs">
            {post.createdAt.toString() === post.updatedAt.toString() && 'Created at ' || 'Last updated at '}{dateFormatter.format(post.updatedAt)}
          </span>
        </div>
        <div className="inline-flex items-center">
          <Link href={`/edit-post/${post.slug}`} className="p-2 hover:bg-secondary rounded-sm">
          </Link>
          <Dialog>
            <DialogTrigger className="p-2 hover:bg-destructive rounded-sm hover:text-destructive-foreground">
              <AiOutlineDelete />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure you want to delete this post?</DialogTitle>
                <div className="flex justify-center gap-2 items-center pt-5">
                  <DialogClose asChild>
                    <form action={formAction}>
                      <Input type="hidden" name="slug" value={post.slug} />
                      <Button variant="destructive">Yes, delete it</Button>
                    </form>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button>
                      Cancel
                    </Button>
                  </DialogClose>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  )
}
