"use server"

import { desc, eq } from "drizzle-orm"
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

export async function getAllPosts() {
  const data = await db.select().from(blogs).orderBy(desc(blogs.id))
  return data
}

export async function getPostsByUserId(authorId: string) {
  const data = await db.select().from(blogs).where(eq(blogs.authorId, authorId))
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
  return author[0].name
}
