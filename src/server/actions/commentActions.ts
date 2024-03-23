"use server"

import { db } from "@/server/db"
import { comments } from "../db/schema/comment"
import { desc, eq } from "drizzle-orm"
import { z } from "zod";
import { genericError } from "../auth/utils";
import { revalidatePath } from "next/cache";
import { users } from "../db/schema/auth";

interface ActionResult {
  error: string;
}

export async function getCommentsByPostId(id: string) {
  const data = await db.select().from(comments).where(eq(comments.postSlug, id)).orderBy(desc(comments.createdAt)).leftJoin(users, eq(comments.userId, users.id))
  return data
}

export async function postComment(
  _: ActionResult,
  commentDetails: {
    postSlug: string;
    userId: string;
  },
  formData: FormData
) {
  const schema = z.object({
    commentDescription: z.string().min(1),
    postSlug: z.string().min(1),
    userId: z.string().min(1),
  })

  const validatedComment = schema.safeParse({
    commentDescription: formData.get('comment'),
    postSlug: commentDetails.postSlug,
    userId: commentDetails.userId,
  })

  if (!validatedComment.success)
    return genericError

  const data = validatedComment.data

  try {
    await db.insert(comments).values({
      description: data.commentDescription,
      userId: data.userId,
      postSlug: data.postSlug
    })

    revalidatePath(`/blog/${commentDetails.postSlug}`)
  } catch (e) {
    return genericError
  }
}
