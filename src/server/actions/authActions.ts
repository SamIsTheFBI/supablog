"use server"

import { Argon2id } from "oslo/password"
import { genericError, setAuthCookie, validateAuthFormData } from "../auth/utils";
import { lucia, validateRequest } from "../auth/lucia";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import db from "../db";
import { redirect } from "next/navigation";
import { generateId } from "lucia";

interface ActionResult {
  error: string;
}

export async function signInAction(
  _: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const { data, error } = validateAuthFormData(formData)
  console.log(data)

  if (error !== null) return { error }

  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, data.email.toLowerCase()))

  if (!existingUser) {
    return {
      error: "Incorrect credentials!",
    }
  }

  const validPassword = await new Argon2id().verify(existingUser.hashedPassword, data.password)

  if (!validPassword) {
    return {
      error: "Incorrect credentials!",
    }
  }

  const session = await lucia.createSession(existingUser.id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  setAuthCookie(sessionCookie)

  return redirect("/dashboard")
}

export async function signUpAction(
  _: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const { data, error } = validateAuthFormData(formData)

  if (error !== null) return { error }

  const hashedPassword = await new Argon2id().hash(data.password)
  const userId = generateId(15)

  try {
    await db.insert(users).values({
      id: userId,
      email: data.email,
      hashedPassword,
    })
  } catch (e) {
    return genericError
  }

  const session = await lucia.createSession(userId, {})
  const sessionCookie = lucia.createSessionCookie(session.id)

  setAuthCookie(sessionCookie)

  return redirect("/dashboard")
}
