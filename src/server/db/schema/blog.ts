import { boolean, integer, numeric, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  coverImage: text("cover_image"),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  isDraft: boolean("is_draft").notNull(),
  authorId: text("author_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  likes: integer("likes").default(0).notNull(),
})

export type SelectBlogs = typeof blogs.$inferSelect
export type InsertBlogs = typeof blogs.$inferInsert
