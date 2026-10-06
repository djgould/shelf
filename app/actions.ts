"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { books, type BookStatus } from "@/db/schema";
import { isStatus } from "@/lib/books";
import { getCurrentUser } from "@/lib/current-user";

export async function addBook(formData: FormData) {
  const user = await getCurrentUser();
  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const status = formData.get("status");
  if (!title || !author) throw new Error("Title and author are required");

  await db.insert(books).values({
    ownerId: user.id,
    title,
    author,
    status: isStatus(status) ? status : "want_to_read",
    finishedAt: status === "finished" ? new Date() : null,
  });
  revalidatePath("/");
}

export async function moveBook(id: string, status: BookStatus) {
  const user = await getCurrentUser();
  await db
    .update(books)
    .set({ status, finishedAt: status === "finished" ? new Date() : null })
    .where(and(eq(books.id, id), eq(books.ownerId, user.id)));
  revalidatePath("/");
}

export async function rateBook(id: string, rating: number | null) {
  const user = await getCurrentUser();
  await db
    .update(books)
    .set({ rating })
    .where(and(eq(books.id, id), eq(books.ownerId, user.id)));
  revalidatePath("/");
}

export async function removeBook(id: string) {
  const user = await getCurrentUser();
  await db.delete(books).where(and(eq(books.id, id), eq(books.ownerId, user.id)));
  revalidatePath("/");
}
