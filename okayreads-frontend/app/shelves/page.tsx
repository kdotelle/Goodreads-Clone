"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type ShelfType = "reading" | "want" | "read" | "dnf";

//replace with api data
//add functionality to update progress by percentage and page
//add option to change shelf
//add date started
//add book detail page
const mockBooks = {
  reading: [
    {
      id: 1,
      title: "The Name of the Wind",
      author: "Patrick Rothfuss",
      genre: "Fantasy",
      progress: 62,
    },
    {
      id: 2,
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      genre: "Nonfiction",
      progress: 31,
    },
    {
      id: 3,
      title: "Piranesi",
      author: "Susanna Clarke",
      genre: "Fantasy",
      progress: 88,
    },
  ],
  want: [
    {
      id: 4,
      title: "Fourth Wing",
      author: "Rebecca Yarros",
      genre: "Fantasy",
      added: "3 days ago",
    },
    {
      id: 5,
      title: "Tomorrow, and Tomorrow, and Tomorrow",
      author: "Gabrielle Zevin",
      genre: "Literary Fiction",
      added: "1 week ago",
    },
  ],
  read: [
    {
      id: 6,
      title: "The House in the Cerulean Sea",
      author: "TJ Klune",
      rating: 5,
      finished: "Jan 2025",
    },
    {
      id: 7,
      title: "Project Hail Mary",
      author: "Andy Weir",
      rating: 5,
      finished: "Dec 2024",
    },
    {
      id: 8,
      title: "Normal People",
      author: "Sally Rooney",
      rating: 3,
      finished: "Nov 2024",
    },
  ],
  dnf: [
    {
      id: 9,
      title: "Infinite Jest",
      author: "David Foster Wallace",
      stoppedAt: 22,
      date: "Aug 2024",
    },
    {
      id: 10,
      title: "Ulysses",
      author: "James Joyce",
      stoppedAt: 8,
      date: "Mar 2024",
    },
  ],
};

const tabs: { key: ShelfType; label: string }[] = [
  { key: "reading", label: "Currently Reading" },
  { key: "want", label: "Want to read" },
  { key: "read", label: "Read" },
  { key: "dnf", label: "Did Not Finish" },
];

export default function ShelvesPage() {
  const [activeTab, setActiveTab] = useState<ShelfType>("reading");

  const { data: session } = useSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      {/* Hero */}
      <section className="pt-32 pb-8 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
            {session.user.name}&#39;s{" "}
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Shelves
            </span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Your personal reading collection
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Currently reading", count: mockBooks.reading.length },
              { label: "Want to read", count: mockBooks.want.length },
              { label: "Read", count: mockBooks.read.length },
              { label: "Did not finish", count: mockBooks.dnf.length },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4"
              >
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.count}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs + Content */}
      <section className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Tab Nav */}
          <div className="flex gap-1 border-b border-gray-200 dark:border-slate-800 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition -mb-px ${
                  activeTab === tab.key
                    ? "border-amber-600 text-amber-600"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Currently Reading */}
          {activeTab === "reading" && (
            <div className="space-y-4">
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
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {book.progress}%
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full">
                        {book.genre}
                      </span>
                    </div>
                  </div>
                  <button className="text-sm px-3 py-1.5 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-600 dark:text-gray-300 hover:border-amber-600 transition flex-shrink-0">
                    Update progress
                  </button>
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
                      <span className="text-amber-500">
                        {"★".repeat(book.rating)}
                        {"☆".repeat(5 - book.rating)}
                      </span>
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
                        Stopped at {book.stoppedAt}%
                      </span>
                      <span className="text-xs text-gray-400">{book.date}</span>
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
      </section>
    </div>
  );
}
