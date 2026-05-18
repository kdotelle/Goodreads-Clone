import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import StarRating from "../Book/StarRating";

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    imageLinks?: {
      smallThumbnail: string;
      thumbnail: string;
    };
    averageRating?: number;
    ratingsCount?: number;
    genre?: string;
    description?: string;
    pageCount?: number;
    publishedDate?: number;
  };
}

export default function BookCard({ book }: { book: Book }) {
  const router = useRouter();

  return (
    <div className="group flex gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 hover:border-amber-200 dark:hover:border-amber-800 hover:shadow-md transition-all duration-200">
      {/* Cover */}
      <div className="flex-shrink-0 w-20 h-28 rounded-lg overflow-hidden shadow-sm">
        {book.volumeInfo.imageLinks?.thumbnail ? (
          <Image
            src={book.volumeInfo.imageLinks.thumbnail}
            alt={book.volumeInfo.title}
            width={20}
            height={28}
            className="w-full h-full object-cover"
          />
        ) : (
          <BookCoverPlaceholder title={book.volumeInfo.title} />
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white text-base leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors truncate">
            {book.volumeInfo.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            by{" "}
            <span className="text-amber-600 dark:text-amber-500 font-medium">
              {book.volumeInfo.authors?.join(", ")}
            </span>
          </p>
          {book.volumeInfo.genre && (
            <span className="inline-block mt-1.5 text-xs px-2 py-0.5 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 rounded-full border border-amber-100 dark:border-amber-900">
              {book.volumeInfo.genre}
            </span>
          )}
          {book.volumeInfo.description && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
              {book.volumeInfo.description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            {book.volumeInfo.averageRating && (
              <StarRating
                rating={book.volumeInfo.averageRating}
                count={book.volumeInfo.ratingsCount}
              />
            )}
            {book.volumeInfo.averageRating && (
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                {book.volumeInfo.rating?.toFixed(1)}
              </span>
            )}
            {book.ratingsCount && (
              <span className="text-xs text-gray-400 dark:text-gray-500">
                ({(book.ratingsCount / 1000).toFixed(0)}k ratings)
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
            {book.volumeInfo.pageCount && (
              <span>{book.volumeInfo.pageCount} pages</span>
            )}
            {book.volumeInfo.publishedDate && (
              <span>{book.volumeInfo.publishedDate}</span>
            )}
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="flex-shrink-0 flex flex-col gap-2 justify-start pt-0.5">
        {/* TODO: wire up Want to Read / shelf logic */}
        <button className="px-3 py-1.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs font-semibold rounded-lg hover:shadow-md transition whitespace-nowrap">
          Want to Read
        </button>
        <button
          className="px-3 py-1.5 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-lg hover:border-amber-400 dark:hover:border-amber-600 transition whitespace-nowrap"
          onClick={() => router.push(`/books/${book.id}`)}
        >
          Details
        </button>
      </div>
    </div>
  );
}

function BookCoverPlaceholder({ title }: { title: string }) {
  const hue =
    (title.charCodeAt(0) * 17 + title.charCodeAt(1 % title.length) * 31) % 360;
  return (
    <div
      className="w-full h-full flex items-end justify-center rounded-lg"
      style={{
        background: `linear-gradient(160deg, hsl(${hue},60%,65%), hsl(${(hue + 40) % 360},70%,45%))`,
      }}
    >
      <span className="text-white/80 text-xs font-medium text-center px-2 pb-2 line-clamp-2 leading-tight">
        {title}
      </span>
    </div>
  );
}
