import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { books, type BookStatus } from "@/db/schema";

export const statusLabels: Record<BookStatus, string> = {
  want_to_read: "Want to read",
  reading: "Reading",
  finished: "Finished",
};

export const statuses = Object.keys(statusLabels) as BookStatus[];

export function isStatus(value: unknown): value is BookStatus {
  return typeof value === "string" && value in statusLabels;
}

export async function listBooks(ownerId: string) {
  return db
    .select()
    .from(books)
    .where(eq(books.ownerId, ownerId))
    .orderBy(desc(books.createdAt));
}
