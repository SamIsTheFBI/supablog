"use server"

import { db } from "@/server/db"
import { users } from "../db/schema/auth"
import { eq } from "drizzle-orm"
import { genericError } from "../auth/utils"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export async function uploadAvatarUrl(url: string, userId: string) {
  try {
    await db.update(users).set({ avatarUrl: url }).where(eq(users.id, userId))
    revalidatePath("/dashboard")
  } catch (e) {
    return genericError
  }
}

type UserInfo = {
  bio: string;
  username: string;
  urls?: {
    value: string;
  }[]
}

export async function updateUserInfo(userInfo: UserInfo, userId: string) {
  const socialLinks = userInfo.urls?.map(i => i.value)
  try {
    await db.update(users).set({ bio: userInfo.bio, name: userInfo.username, socialLinks: socialLinks }).where(eq(users.id, userId))
  } catch (e) {
    return genericError
  }
}

export async function getUserList() {
  const data = await db.select().from(users)
  return data
}

export async function promoteToAdmin(prevState: { error: string }, formData: FormData) {
  const schema = z.object({
    userId: z.string().min(1),
  })

  const validatedFormData = schema.safeParse({
    userId: formData.get('user_id'),
  })

  if (!validatedFormData.success)
    return {
      error: "Invalid User!"
    }

  const data = validatedFormData.data

  try {
    await db.update(users).set({ isAdmin: true }).where(eq(users.id, data.userId))
  } catch (e) {
    return genericError
  }

  revalidatePath('/dashboard/manage-users')
  return { error: '' }
}

export async function demoteToAuthor(prevState: { error: string }, formData: FormData) {
  const schema = z.object({
    userId: z.string().min(1),
  })

  const validatedFormData = schema.safeParse({
    userId: formData.get('user_id'),
  })

  if (!validatedFormData.success)
    return {
      error: "Invalid User!"
    }

  const data = validatedFormData.data

  try {
    await db.update(users).set({ isAdmin: false }).where(eq(users.id, data.userId))
  } catch (e) {
    return genericError
  }

  revalidatePath('/dashboard/manage-users')
  return { error: '' }
}
