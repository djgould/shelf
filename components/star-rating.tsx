import { rateBook } from "@/app/actions";
import type { Book } from "@/db/schema";

export function StarRating({ book }: { book: Book }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <form key={star} action={rateBook.bind(null, book.id, book.rating === star ? null : star)}>
          <button
            className={`px-0.5 text-lg leading-none ${book.rating && star <= book.rating ? "text-amber-500" : "text-stone-300 hover:text-stone-400"}`}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
          >
            ★
          </button>
        </form>
      ))}
    </div>
  );
}
