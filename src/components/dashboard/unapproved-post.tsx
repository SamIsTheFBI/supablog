"use client"

import { SelectBlogs } from "@/server/db/schema/blog";
import { LuCheck, LuEye, LuPencil } from "react-icons/lu";
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
import { approvePost, deletePost } from "@/server/actions/blogActions";
import { Input } from "../ui/input";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { cn, dateFormatter } from "@/lib/utils";
import { SelectUsers } from "@/server/db/schema/auth";
import { AuthSession, genericError } from "@/server/auth/utils";

export default function UnapprovedBlogItem({ post, author }: { post: SelectBlogs, author: SelectUsers }) {
  const [state, formAction] = useFormState(handleApprovePost, {
    error: "",
  })

  async function handleApprovePost(currentState: { error: string }, formData: FormData) {
    const slug = formData.get('slug') as string
    const error = await approvePost(slug)
    if (error === undefined) {
      toast.success("Successfully deleted the post!")
    } else {
      toast.error("An error occurred.")
    }
    return error
  }
  return (
    <>
      <div className="px-4 py-2 border border-border rounded-sm text-wrap gap-2 hover:bg-secondary">
        <div className="flex justify-between items-center text-wrap gap-2 hover:bg-secondary">
          <div className="inline-flex justify-between items-center flex-grow mr-4 lg:mr-16 max-sm:flex-wrap w-full">
            <Link href={`/preview/${post.slug}`} target="_blank" className={`hover:underline group underline-offset-2 inline-flex gap-x-2 items-center ${post.isDraft && `decoration-muted-foreground`}`}>
              <span className="text-muted-foreground text-sm group-hover:flex hidden">
                <LuEye />
              </span>
              <span className={cn(post.isDraft && 'text-muted-foreground', "max-w-md text-pretty font-bold")}>{post.title}</span>
            </Link>
            <span className="text-muted-foreground text-sm max-sm:text-xs">
              {post.createdAt.toString() === post.updatedAt.toString() && 'Created at ' || 'Last updated at '}{dateFormatter.format(post.updatedAt)}
            </span>
          </div>
          <div className="inline-flex items-center">
            <Link href={`/edit-post/${post.slug}`} className="p-2 hover:bg-secondary rounded-sm">
            </Link>
            <Dialog>
              <DialogTrigger className="p-2 hover:bg-green-400 hover:dark:bg-green-400/55 rounded-sm hover:text-destructive-foreground">
                <LuCheck />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure you want to approve this post?</DialogTitle>
                  <div className="flex justify-center gap-2 items-center pt-5">
                    <DialogClose asChild>
                      <form action={formAction}>
                        <Input type="hidden" name="slug" value={post.slug} />
                        <Button variant="outline" className="hover:bg-green-400/85 bg-green-400 dark:bg-green-400/55">Yes, approve it</Button>
                      </form>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button variant="outline">
                        Cancel
                      </Button>
                    </DialogClose>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <span className="text-sm">{author.name}</span>
      </div>
    </>
  )
}
