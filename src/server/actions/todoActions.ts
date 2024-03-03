"use server"

import { asc, eq } from 'drizzle-orm';
import { db } from "@/server/db";
import { todos } from '@/server/db/schema/todo';
import { revalidatePath } from 'next/cache';

export const getData = async () => {
  const data = await db.select().from(todos).orderBy(asc(todos.id))
  return data;
};

export const addTodo = async (text: string) => {
  await db.insert(todos).values({
    text: text,
  })
  revalidatePath("/")
}

export const deleteTodo = async (id: number) => {
  await db.delete(todos).where(eq(todos.id, id))
  revalidatePath("/")
}
