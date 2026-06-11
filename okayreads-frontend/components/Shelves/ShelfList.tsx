"use client";
import { useState } from "react";
import StarRating from "../../components/Book/StarRating";

type ShelfType = "reading" | "want" | "read" | "dnf";

//replace with api data
//add functionality to update progress by percentage and page
//add option to change shelf
//add date started
//add book detail page

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  progress: number;
  finished: string;
  added: string;
  rating: number;
}

export default function ShelfList() {
  const [activeTab, setActiveTab] = useState<ShelfType>("reading");
  const [mockBooks, setMockBooks] = useState({
    reading: [
      {
        id: 1,
        title: "The Name of the Wind",
        author: "Patrick Rothfuss",
        genre: "Fantasy",
        progress: 62,
        finished: "",
        added: "",
        rating: 0,
      },
      {
        id: 2,
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        genre: "Nonfiction",
        progress: 31,
        finished: "",
        added: "",
        rating: 0,
      },
      {
        id: 3,
        title: "Piranesi",
        author: "Susanna Clarke",
        genre: "Fantasy",
        progress: 88,
        added: "",
        rating: 0,
      },
    ],
    want: [
      {
        id: 4,
        title: "Fourth Wing",
        author: "Rebecca Yarros",
        genre: "Fantasy",
        added: "3 days ago",
        progress: "",
        finished: "",
        rating: 0,
      },
      {
        id: 5,
        title: "Tomorrow, and Tomorrow, and Tomorrow",
        author: "Gabrielle Zevin",
        genre: "Literary Fiction",
        added: "1 week ago",
        progress: "",
        finished: "",
        rating: 0,
      },
    ],
    read: [
      {
        id: 6,
        title: "The House in the Cerulean Sea",
        author: "TJ Klune",
        rating: 5,
        finished: "Jan 2025",
        genre: "Fiction",
        progress: 100,
        added: "Dec 2024",
      },
      {
        id: 7,
        title: "Project Hail Mary",
        author: "Andy Weir",
        rating: 5,
        finished: "Dec 2024",
        genre: "Sci-Fi",
        progress: 100,
        added: "Dec 2024",
      },
      {
        id: 8,
        title: "Normal People",
        author: "Sally Rooney",
        rating: 3,
        finished: "Nov 2024",
        genre: "Fiction",
        progress: 100,
        added: "Oct 2024",
      },
    ],
    dnf: [
      {
        id: 9,
        title: "Infinite Jest",
        author: "David Foster Wallace",
        progress: 22,
        finished: "Aug 2024",
        rating: 0,
        genre: "Fiction",
        added: "April 2024",
      },
      {
        id: 10,
        title: "Ulysses",
        author: "James Joyce",
        progress: 8,
        finished: "Mar 2024",
        rating: 0,
        genre: "Autobiography",
        added: "Jan 2024",
      },
    ],
  });

  const [editingProgressId, setEditingProgressId] = useState<number | null>(
    null,
  );
  const [progressInput, setProgressInput] = useState<string>("0");

  function startEditingProgress(book: Book) {
    setEditingProgressId(book.id);
    setProgressInput(String(book.progress));
  }

  function saveProgress(bookId: number) {
    const nextValue = Number(progressInput);
    if (Number.isNaN(nextValue) || nextValue < 0 || nextValue > 100) {
      return;
    }

    if (nextValue === 100) {
      moveBookToRead(bookId);
      return;
    }

    setMockBooks((current) => ({
      ...current,
      reading: current.reading.map((book) =>
        book.id === bookId ? { ...book, progress: nextValue } : book,
      ),
    }));
    setEditingProgressId(null);
  }

  function moveBookToRead(bookId: number) {
    setMockBooks((current) => {
      const book = current.reading.find((book) => book.id === bookId);
      if (!book) return current;

      const today: Date = new Date();

      const formattedDate = today.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });

      return {
        ...current,
        reading: current.reading.filter((book) => book.id !== bookId),
        read: [
          ...current.read,
          {
            ...book,
            rating: 0,
            finished: formattedDate,
          },
        ],
      };
    });
  }

  function moveBookToDNF(bookId: number) {
    setMockBooks((current) => {
      const book = current.reading.find((book) => book.id === bookId);
      if (!book) return current;

      const today: Date = new Date();

      const formattedDate = today.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });

      return {
        ...current,
        reading: current.reading.filter((book) => book.id !== bookId),
        dnf: [
          ...current.dnf,
          {
            ...book,
            finished: formattedDate,
          },
        ],
      };
    });
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Currently reading",
            count: mockBooks.reading.length,
            key: "reading",
          },
          { label: "Want to read", count: mockBooks.want.length, key: "want" },
          { label: "Read", count: mockBooks.read.length, key: "read" },
          { label: "Did not finish", count: mockBooks.dnf.length, key: "dnf" },
        ].map((stat) => (
          <button
            onClick={() => setActiveTab(stat.key)}
            key={stat.label}
            className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-gray-200 dark:border-slate-800"
          >
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {stat.count}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {stat.label}
            </p>
          </button>
        ))}
      </div>

      {/* Currently Reading */}
      {activeTab === "reading" && (
        <div className="space-y-4 mb-8">
          {mockBooks.reading.map((book) => (
            <div
              key={book.id}
              className="flex gap-4 items-center p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800"
            >
              <div className="w-14 h-20 bg-amber-100 dark:bg-amber-900/30 rounded flex items-center justify-center text-2xl flex-shrink-0">
                📖
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white truncate">
                  {book.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {book.author}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="w-24 h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-600 to-orange-600 rounded-full"
                      style={{ width: `${book.progress}%` }}
                    />
                  </div>
                  {editingProgressId === book.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={progressInput}
                        onChange={(event) =>
                          setProgressInput(event.target.value)
                        }
                        className="w-16 text-xs rounded border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white px-2 py-1"
                      />
                      <button
                        onClick={() => saveProgress(book.id)}
                        className="text-xs px-2 py-1 border border-amber-600 bg-amber-600 text-white rounded-lg"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => moveBookToRead(book.id)}
                        className="text-xs px-2 py-1 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-600 dark:text-gray-300 hover:border-amber-600 transition flex-shrink-0"
                      >
                        Finished
                      </button>
                      <button
                        onClick={() => moveBookToDNF(book.id)}
                        className="text-xs px-2 py-1 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-600 dark:text-gray-300 hover:border-amber-600 transition flex-shrink-0"
                      >
                        DNF
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-500 dark:text-gray-400  ">
                      {book.progress}%
                    </span>
                  )}
                  <span className="text-xs px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full">
                    {book.genre}
                  </span>
                </div>
              </div>
              {editingProgressId === book.id ? (
                <button
                  className="text-sm px-3 py-1.5 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-600 dark:text-gray-300 hover:border-amber-600 transition flex-shrink-0"
                  onClick={() => setEditingProgressId(null)}
                >
                  Cancel
                </button>
              ) : (
                <button
                  className="text-sm px-3 py-1.5 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-600 dark:text-gray-300 hover:border-amber-600 transition flex-shrink-0"
                  onClick={() => startEditingProgress(book)}
                >
                  Update progress
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Want to Read */}
      {activeTab === "want" && (
        <div className="space-y-4">
          {mockBooks.want.map((book) => (
            <div
              key={book.id}
              className="flex gap-4 items-center p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800"
            >
              <div className="w-14 h-20 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center text-2xl flex-shrink-0">
                📘
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white truncate">
                  {book.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {book.author}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                    {book.genre}
                  </span>
                  <span className="text-xs text-gray-400">
                    Added {book.added}
                  </span>
                </div>
              </div>
              <button className="text-sm px-3 py-1.5 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-600 dark:text-gray-300 hover:border-amber-600 transition flex-shrink-0">
                Start reading
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Read */}
      {activeTab === "read" && (
        <div className="space-y-4">
          {mockBooks.read.map((book) => (
            <div
              key={book.id}
              className="flex gap-4 items-center p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800"
            >
              <div className="w-14 h-20 bg-green-100 dark:bg-green-900/30 rounded flex items-center justify-center text-2xl flex-shrink-0">
                📗
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white truncate">
                  {book.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {book.author}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <StarRating rating={book.rating} />
                  <span className="text-xs text-gray-400">
                    Finished {book.finished}
                  </span>
                </div>
              </div>
              <button className="text-sm px-3 py-1.5 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-600 dark:text-gray-300 hover:border-amber-600 transition flex-shrink-0">
                Edit review
              </button>
            </div>
          ))}
        </div>
      )}

      {/* DNF */}
      {activeTab === "dnf" && (
        <div className="space-y-4">
          {mockBooks.dnf.map((book) => (
            <div
              key={book.id}
              className="flex gap-4 items-center p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800"
            >
              <div className="w-14 h-20 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-2xl flex-shrink-0 opacity-60">
                📓
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white truncate">
                  {book.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {book.author}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">
                    Stopped at {book.progress}%
                  </span>
                  <span className="text-xs text-gray-400">{book.finished}</span>
                </div>
              </div>
              <button className="text-sm px-3 py-1.5 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-600 dark:text-gray-300 hover:border-amber-600 transition flex-shrink-0">
                Try again
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
