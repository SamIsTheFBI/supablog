"use server"

import { and, desc, eq } from "drizzle-orm"
import { db } from "../db"
import { blogs, type InsertBlogs } from "../db/schema/blog"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { genericError } from "../auth/utils"
import { users } from "../db/schema/auth"

interface ActionResult {
  error: string;
}

export async function updatePost(blogPost: InsertBlogs): Promise<ActionResult> {
  let { slug, ...notSlug } = blogPost
  await db.update(blogs).set(notSlug).where(eq(blogs.slug, slug))
  revalidatePath("/dashboard")
  redirect("/dashboard")
}

export async function publishAction(blogPost: InsertBlogs): Promise<ActionResult> {
  const existingSlug = await getPostBySlug(blogPost.slug)
  if (existingSlug.length > 0) {
    return {
      error: "This slug is already in use! Please use a different title or slug for this post."
    }
  }

  const existingTitle = await db.select().from(blogs).where(eq(blogs.title, blogPost.title))
  if (existingTitle.length > 0) {
    return {
      error: "This title is already in use! Please use a different title for this post."
    }
  }

  await db.insert(blogs).values(blogPost)
  revalidatePath("/dashboard")
  redirect("/dashboard")
}

export async function getAuthorById(id: string) {
  const data = await db.select().from(users).where(eq(users.id, id))
  return data[0]
}

export async function getPostsByOffset(offset: number, limit: number, published: boolean = true) {
  const data = await db.select().from(blogs).where(eq(blogs.isApproved, published)).orderBy(desc(blogs.createdAt)).limit(limit).offset(offset)
  return data
}

export async function getPublishedPostsCount() {
  const data = await db.select().from(blogs).where(eq(blogs.isApproved, true))
  return data.length
}

export async function getPublishedPosts() {
  const data = await db.select().from(blogs).where(eq(blogs.isApproved, true)).orderBy(desc(blogs.createdAt))
  return data
}

export async function getRecentPosts(limit: number) {
  const data = await db.select().from(blogs).where(eq(blogs.isApproved, true)).orderBy(desc(blogs.updatedAt)).limit(limit)
  return data
}

export async function getAllPosts() {
  const data = await db.select().from(blogs).orderBy(desc(blogs.updatedAt))
  return data
}

export async function getPostsByUserId(authorId: string) {
  const data = await db.select().from(blogs).where(eq(blogs.authorId, authorId)).orderBy(desc(blogs.updatedAt))
  return data;
}

export async function getPostBySlug(slug: string) {
  const data = await db.select().from(blogs).where(eq(blogs.slug, slug))
  return data
}

export async function deletePost(slug: string) {
  try {
    await db.delete(blogs).where(eq(blogs.slug, slug)).returning()
  } catch (e) {
    return genericError
  }

  // todo: please find out why removing redirect angers eslint in blog-list-item.tsx
  // you don't understand useFormState i think
  revalidatePath("/dashboard")
  redirect("/dashboard")
}

export async function getUserById(id: string) {
  const author = await db.select().from(users).where(eq(users.id, id))
  return author
}

export async function getUnapprovedPosts() {
  const data = await db.select().from(blogs).where(and(eq(blogs.isApproved, false), eq(blogs.isDraft, false))).leftJoin(users, eq(users.id, blogs.authorId)).orderBy(desc(blogs.createdAt))
  return data
}

export async function approvePost(slug: string) {
  try {
    await db.update(blogs).set({ isApproved: true, createdAt: new Date(), updatedAt: new Date() }).where(eq(blogs.slug, slug))
  } catch (e) {
    return genericError
  }

  // todo: please find out why removing redirect angers eslint in blog-list-item.tsx
  // you don't understand useFormState i think
  revalidatePath("/dashboard")
  redirect("/dashboard")
}
