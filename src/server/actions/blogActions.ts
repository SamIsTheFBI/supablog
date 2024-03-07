"use server"

import { desc, eq } from "drizzle-orm"
import { db } from "../db"
import { blogs, type InsertBlogs } from "../db/schema/blog"
import { revalidatePath } from "next/cache"

export async function publishAction(blogPost: InsertBlogs) {
  console.log("Publishing...")
  await db.insert(blogs).values(blogPost)
  console.log("Successful!")
  revalidatePath("/")
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
