import { moveBook, removeBook } from "@/app/actions";
import { StarRating } from "@/components/star-rating";
import type { Book } from "@/db/schema";
import { statusLabels, statuses } from "@/lib/books";

export function BookItem({ book }: { book: Book }) {
  return (
    <li className="flex items-start justify-between gap-4 rounded-lg border border-stone-200 bg-white p-4">
      <div className="min-w-0">
        <p className="font-medium text-stone-900">{book.title}</p>
        <p className="text-sm text-stone-600">{book.author}</p>
        {book.notes && <p className="mt-2 text-sm italic text-stone-500">{book.notes}</p>}
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-700">
          {statusLabels[book.status]}
        </span>
        <div className="flex gap-1">
          {statuses
            .filter((status) => status !== book.status)
            .map((status) => (
              <form key={status} action={moveBook.bind(null, book.id, status)}>
                <button className="rounded px-1.5 py-0.5 text-xs text-stone-500 hover:bg-stone-100 hover:text-stone-900">
                  {statusLabels[status]}
                </button>
              </form>
            ))}
        </div>
        {book.status === "finished" && <StarRating book={book} />}
        <form action={removeBook.bind(null, book.id)}>
          <button className="text-xs text-stone-400 hover:text-red-600">Remove</button>
        </form>
      </div>
    </li>
  );
}
