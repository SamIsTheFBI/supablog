"use server"

import { db } from "@/server/db"
import { users } from "../db/schema/auth"
import { eq } from "drizzle-orm"
import { genericError } from "../auth/utils"
import { revalidatePath } from "next/cache"

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
