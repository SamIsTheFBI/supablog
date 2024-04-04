import { numeric, pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { blogs } from "./blog";
import { users } from "./auth";

export const comments = pgTable("comments", {
  id: serial("id"),
  uuid: uuid("uuid").defaultRandom().primaryKey(),
  description: text("description").notNull(),
  userId: text("user_id").notNull().references(() => users.id),
  postSlug: text("post_slug").notNull().references(() => blogs.slug),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  parentId: uuid("parent_id"),
  children: uuid("children").array(),
})

export const commentLikes = pgTable("commentLikes", {
  id: serial("id").primaryKey(),
  commentId: uuid("comment_id").notNull().references(() => comments.uuid, { onDelete: 'cascade' }),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
})

export type SelectComments = typeof comments.$inferSelect
export type InsertComments = typeof comments.$inferInsert
