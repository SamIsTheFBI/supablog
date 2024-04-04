"use server"

import { db } from "@/server/db"
import { comments } from "../db/schema/comment"
import { and, desc, eq, isNull } from "drizzle-orm"
import { z } from "zod";
import { genericError } from "../auth/utils";
import { revalidatePath } from "next/cache";
import { users } from "../db/schema/auth";

interface ActionResult {
  error: string;
}

export async function getCommentsByPostId(id: string) {
  const data = await db
    .select()
    .from(comments)
    .where(and(eq(comments.postSlug, id), isNull(comments.parentId)))
    .orderBy(desc(comments.createdAt))
    .leftJoin(users, eq(comments.userId, users.id))

  return data
}

export async function getRepliesByParentId(id: string) {
  const data = await db
    .select()
    .from(comments)
    .where(eq(comments.parentId, id))
    .orderBy(desc(comments.createdAt))
    .leftJoin(users, eq(comments.userId, users.id))
  return data
}

export async function replyToComment(formData: FormData) {
  const schema = z.object({
    parentCommentId: z.string().min(1),
    commentDescription: z.string().min(1),
    userId: z.string().min(1),
  })

  const validatedComment = schema.safeParse({
    parentCommentId: formData.get('parent_comment_uuid'),
    commentDescription: formData.get('comment_description'),
    userId: formData.get('user_id'),
  })

  if (!validatedComment.success)
    return genericError

  const data = validatedComment.data
  const [parentComment] = await getCommentById(data.parentCommentId)
  try {
    const [insertedComment] = await db.insert(comments).values({
      userId: data.userId,
      postSlug: parentComment.comments.postSlug,
      parentId: data.parentCommentId,
      description: data.commentDescription,
    }).returning({ insertedId: comments.uuid, parentId: comments.parentId });

    const childArray = parentComment.comments.children && [...parentComment.comments.children, insertedComment.insertedId] || [insertedComment.insertedId]
    await db.update(comments).set({ children: childArray }).where(eq(comments.uuid, insertedComment.insertedId))
    revalidatePath(`/blog`)
    console.log("SUCESSS")
    return {
      success: true,
      insertedId: insertedComment.insertedId,
    }
  } catch (e) {
    console.log("Failure")
    return genericError
  }
}

export async function updateCommentById(formData: FormData) {
  const schema = z.object({
    commentDescription: z.string().min(1),
    commentUuid: z.string().min(1),
  })

  const validatedComment = schema.safeParse({
    commentDescription: formData.get('comment_description'),
    commentUuid: formData.get('comment_uuid'),
  })

  if (!validatedComment.success)
    return genericError

  const data = validatedComment.data
  try {
    await db.update(comments).set({ description: data.commentDescription, updatedAt: new Date() }).where(eq(comments.uuid, data.commentUuid))
    revalidatePath(`/blog`)
    console.log("SUCESSS")
    return {
      success: true,
    }
  } catch (e) {
    console.log("Failure")
    return genericError
  }
}

export async function getCommentById(id: string) {
  const data = await db
    .select()
    .from(comments)
    .where(eq(comments.uuid, id))
    .leftJoin(users, eq(comments.userId, users.id))
  return data
}

export async function deleteCommentById(formData: FormData) {
  const id = formData.get('comment_uuid')
  const schema = z.string()
  const validId = schema.safeParse(id)
  if (!validId.success) return

  const data = await db
    .delete(comments)
    .where(eq(comments.uuid, validId.data))

  revalidatePath(`/blog`) // idk if doing this is considered good practice, maybe getting specific page is better
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
