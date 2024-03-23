import { numeric, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { blogs } from "./blog";
import { users } from "./auth";

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
  userId: text("user_id").notNull().references(() => users.id),
  postSlug: text("post_slug").notNull().references(() => blogs.slug),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export type SelectBlogs = typeof comments.$inferSelect
export type InsertBlogs = typeof comments.$inferInsert
