import Link from "next/link";
import { BookItem } from "@/components/book-item";
import { isStatus, listBooks, statusLabels, statuses } from "@/lib/books";
import { getCurrentUser } from "@/lib/current-user";
import { addBook } from "./actions";

export default async function ReadingListPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const filter = isStatus(status) ? status : undefined;
  const user = await getCurrentUser();
  const books = await listBooks(user.id);
  const visible = filter ? books.filter((book) => book.status === filter) : books;
  const count = (value: string) => books.filter((book) => book.status === value).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-stone-900">{user.name.split(" ")[0]}&apos;s reading list</h1>
        <p className="mt-1 text-sm text-stone-600">
          {count("reading")} reading · {count("want_to_read")} up next · {count("finished")} finished
        </p>
      </div>

      <form action={addBook} className="grid gap-2 rounded-lg border border-stone-200 bg-white p-4 sm:grid-cols-[1fr_1fr_9rem_auto]">
        <input name="title" placeholder="Title" required className="rounded-md border border-stone-300 px-3 py-2 text-sm" />
        <input name="author" placeholder="Author" required className="rounded-md border border-stone-300 px-3 py-2 text-sm" />
        <select name="status" defaultValue="want_to_read" className="rounded-md border border-stone-300 bg-white px-2 py-2 text-sm">
          {statuses.map((value) => (
            <option key={value} value={value}>
              {statusLabels[value]}
            </option>
          ))}
        </select>
        <button className="rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700">
          Add book
        </button>
      </form>

      <div className="flex gap-2 text-sm">
        {[undefined, ...statuses].map((value) => (
          <Link
            key={value ?? "all"}
            href={value ? `/?status=${value}` : "/"}
            className={`rounded-full px-3 py-1 ${
              value === filter ? "bg-stone-900 text-white" : "bg-white text-stone-700 ring-1 ring-stone-200 hover:bg-stone-100"
            }`}
          >
            {value ? statusLabels[value] : "All"}
          </Link>
        ))}
      </div>

      <ul className="space-y-3">
        {visible.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </ul>
      {visible.length === 0 && <p className="text-sm text-stone-500">Nothing here yet.</p>}
    </div>
  );
}
