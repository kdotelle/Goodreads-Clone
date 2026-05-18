"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";
import BookCard from "../../components/Book/BookCard";

export default function Books() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState([]);

  const searchBooks = async () => {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
    const BASE_URL = "https://www.googleapis.com/books/v1";
    const response = await fetch(
      `${BASE_URL}/volumes?q=${encodeURIComponent(query)}&key=${API_KEY}`,
    );
    if (!response.ok) throw new Error("Failed to fetch books");
    const data = await response.json();
    setBooks(data.items || []);
  };

  console.log(books);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setHasSearched(false);

    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
    const BASE_URL = "https://www.googleapis.com/books/v1";
    const response = await fetch(
      `${BASE_URL}/volumes?q=${encodeURIComponent(query)}&key=${API_KEY}`,
    );
    if (!response.ok) throw new Error("Failed to fetch books");
    const data = await response.json();
    setBooks(data.items || []);

    setIsLoading(false);
    setHasSearched(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      {/* ── Page Header ── */}
      <section className="pt-24 pb-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-3">
              Discover Your Next{" "}
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Okay Read
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Search millions of books by title, author, or genre.
            </p>

            {/* ── Search Bar ── */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400 dark:text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search by title, author, or ISBN…"
                  className="w-full pl-12 pr-4 py-3.5 text-gray-900 dark:text-white bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-600 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500 shadow-sm text-sm"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={isLoading || !query.trim()}
                className="px-6 py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none text-sm whitespace-nowrap"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Searching…
                  </span>
                ) : (
                  "Search"
                )}
              </button>
            </div>

            {/* Quick filter chips */}
            <div className="flex flex-wrap gap-2 mt-4">
              {[
                "Fiction",
                "Non-Fiction",
                "Science Fiction",
                "Mystery",
                "Romance",
                "Biography",
              ].map((genre) => (
                <button
                  key={genre}
                  onClick={() => {
                    setQuery(genre);
                  }}
                  className="px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:text-amber-700 dark:hover:text-amber-400 border border-gray-200 dark:border-slate-700 hover:border-amber-200 dark:hover:border-amber-800 rounded-full transition"
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Results Area ── */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto">
          {/* Loading skeleton */}
          {isLoading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 animate-pulse"
                >
                  <div className="w-20 h-28 bg-gray-200 dark:bg-slate-700 rounded-lg flex-shrink-0" />
                  <div className="flex-1 space-y-3 py-1">
                    <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-2/3" />
                    <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/3" />
                    <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-full" />
                    <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Results */}
          {!isLoading && hasSearched && (
            <>
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {books.length > 0
                    ? `${books.length} result${books.length !== 1 ? "s" : ""} for `
                    : "No results for "}
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {query}
                  </span>
                </p>
                {books.length > 0 && (
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    Sorted by relevance
                  </span>
                )}
              </div>

              {books.length > 0 ? (
                <div className="space-y-4">
                  {books.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">📭</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    No books found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Try a different title, author, or browse by genre above.
                  </p>
                  <button
                    onClick={() => setQuery("")}
                    className="px-6 py-2.5 border-2 border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:border-amber-600 dark:hover:border-amber-500 transition"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </>
          )}

          {/* Pre-search state */}
          {!isLoading && !hasSearched && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800 mb-6">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Search for any book
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                Enter a title, author name, or genre to find your next great
                read.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
