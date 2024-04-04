"use client"

import { SelectUsers } from "@/server/db/schema/auth";
import { SelectComments } from "@/server/db/schema/comment";
import { LuDelete, LuFileEdit, LuHeart, LuPencil, LuReply } from "react-icons/lu";
import { Button } from "../ui/button";
import { FaTrash } from "react-icons/fa";
import { deleteCommentById, getCommentById, replyToComment, updateCommentById } from "@/server/actions/commentActions";
import { Textarea } from "../ui/textarea";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function CommentCard({
  comment,
  user,
  blogAuthorId,
  currentUserId,
  children,
}: {
  comment: SelectComments,
  user: SelectUsers | null | undefined,
  blogAuthorId: string,
  currentUserId: string | null | undefined,
  children?: React.ReactNode
}) {

  type ReplyType = {
    comments: SelectComments,
    user: SelectUsers | null,
  }

  const [childArray, setChildArray] = useState<Array<ReplyType>>()

  // let childArray = []
  // if (comment.children && comment.children.length > 0) {
  //   for (const id of comment.children) {
  //     const [data] = await getCommentById(id)
  //     childArray.push(data)
  //   }
  // }

  const [isUpdating, setIsUpdating] = useState(false)
  return (
    <>
      <li className="space-y-4">
        <div className="bg-secondary/15 p-4 border shadow-sm dark:shadow-primary/15 rounded-md space-y-2">
          <div className="space-x-2">
            <span className="font-bold max-sm:text-sm">{user?.name?.split(' ').slice(0, 2).join(' ')}</span>
            {
              blogAuthorId === user?.id &&
              <span className="text-xs bg-secondary px-2 py-1 rounded-md border antialiased">Author</span>
            }
            <span className="text-muted-foreground text-xs">&bull;</span>
            <span className="text-muted-foreground max-sm:text-xs text-sm">{comment.createdAt.toLocaleString()}</span>
            <span className="text-muted-foreground text-xs">&bull;</span>
            {
              comment.createdAt.getTime() !== comment.updatedAt.getTime() &&
              <span className="text-muted-foreground text-xs">(Edited)</span>
            }
          </div>
          <p className={cn(isUpdating && 'hidden')}>
            {comment.description}
          </p>
          <form className={cn(!isUpdating && 'hidden')} action={async (formData) => {
            const res: { error?: string, success?: boolean } = await updateCommentById(formData)
            if (res.success) {
              setIsUpdating(false)
            }
          }}>
            <input hidden readOnly aria-hidden name="comment_uuid" value={comment.uuid} />
            <Textarea name="comment_description" placeholder={comment.description} required></Textarea>
            <div className="flex gap-x-2 mt-2">
              <Button type="submit">Confirm</Button>
              <Button type="reset" onClick={() => setIsUpdating(false)}>Cancel</Button>
            </div>
          </form>
          <div className="text-sm flex w-full gap-x-2">
            {
              currentUserId === user?.id &&
              <form action={deleteCommentById}>
                <input hidden readOnly aria-hidden name="comment_uuid" value={comment.uuid} />
                <Button variant="ghost"><FaTrash /></Button>
              </form>
            }
            {
              currentUserId === user?.id && !isUpdating &&
              <Button variant="ghost" onClick={() => setIsUpdating(true)}><LuPencil /></Button>
            }
          </div>
        </div>
        <div className="pl-6 border-l border-border space-y-2">
          <ul className="space-y-2">
            {childArray && childArray.length > 0 &&
              childArray.sort((a, b) => a.comments.createdAt.getTime() - b.comments.createdAt.getTime()).map((child) => (
                <CommentCard
                  key={child?.comments.uuid}
                  comment={child?.comments}
                  user={child?.user}
                  blogAuthorId={blogAuthorId}
                  currentUserId={currentUserId}
                />
              ))
            }
          </ul>
          <form
            className="hidden"
            action={async (formData) => {
              const res: { error?: string, success?: boolean, insertedId?: string } = await replyToComment(formData)
              console.log(res)
              if (res.success && res.insertedId) {
                const [reply] = await getCommentById(res.insertedId)

                if (childArray)
                  setChildArray([
                    ...childArray,
                    reply
                  ])
                else
                  setChildArray([reply])
              }
            }}>
            <input hidden readOnly aria-hidden name="parent_comment_uuid" value={comment.parentId ?? comment.uuid} />
            <input hidden readOnly aria-hidden name="user_id" value={user?.id} />
            <Textarea name="comment_description" />
            <div className="flex gap-x-4 mt-2">
              <Button type="submit">Reply</Button>
            </div>
          </form>
          {children}
        </div>
      </li>
    </>
  )
}
