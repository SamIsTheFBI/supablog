"use client"

import { AuthSession } from "@/server/auth/utils"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { postComment } from "@/server/actions/commentActions"
import { useFormState, useFormStatus } from "react-dom"
import { useRef } from "react"

export default function CommentForm({ session, postSlug }: { session: AuthSession, postSlug: string }) {

  const commentDetails = {
    postSlug: postSlug,
    userId: session.session?.user.id as string
  }

  const postCommentWithDetails = postComment.bind(null, { error: "" }, commentDetails)
  const { pending } = useFormStatus()

  const ref = useRef<HTMLFormElement>(null)

  return (
    <form
      ref={ref}
      action={async (formData) => {
        await postCommentWithDetails(formData)
        ref.current?.reset()
      }}
      className="space-y-4"
    >
      <Textarea name="comment" required></Textarea>
      <Button disabled={pending}>Post{pending && 'ing'} comment</Button>
    </form>
  )
}
