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

export default function BlogListItem({ post }: { post: SelectBlogs }) {
  const [state, formAction] = useFormState(handleDeletePost, {
    error: "",
  })

  async function handleDeletePost(currentState: { error: string }, formData: FormData) {
    const slug = formData.get('slug') as string
    const error = await deletePost(slug)
    console.log(error)
    if (error === undefined) {
      toast.success("Successfully deleted the post!")
    } else {
      toast.error("An error occurred.")
    }
    return error
  }
  return (
    <>
      <div className="px-4 py-2 border rounded-sm flex justify-between items-center text-wrap gap-2">
        {post.title}
        <div className="inline-flex items-center">
          <Link href={`/edit-post/${post.slug}`} className="p-2 hover:bg-secondary rounded-sm">
            <LuPencil />
          </Link>
          <Dialog>
            <DialogTrigger className="p-2 hover:bg-secondary rounded-sm hover:text-destructive">
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
