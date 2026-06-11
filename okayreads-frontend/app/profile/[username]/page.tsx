"use client";

import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import ShelfList from "../../../components/Shelves/ShelfList";

type ProfileTab = "overview" | "shelves" | "reviews";

const mockUser = {
  name: "Kristen L.",
  handle: "kristenl",
  memberSince: "2024",
  bio: "Lover of fiction, sci-fi, and anything that keeps me up past midnight. Always reading the book before watching the movie.",
  location: "Virginia, USA",
  friendCount: 24,
  avatar: null as string | null, // swap with session.user.image when connected
  stats: { read: 47, wantToRead: 12, reading: 3 },
  challenge: { goal: 50, current: 23 },
  genres: [
    "Fantasy",
    "Sci-fi",
    "Literary fiction",
    "Nonfiction",
    "Mystery",
    "Horror",
  ],
};

const mockCurrentlyReading = [
  {
    id: 1,
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    progress: 62,
  },
  { id: 2, title: "Piranesi", author: "Susanna Clarke", progress: 88 },
];

const mockRecentlyRead = [
  { id: 3, title: "Project Hail Mary", author: "Andy Weir", rating: 5 },
  {
    id: 4,
    title: "The House in the Cerulean Sea",
    author: "TJ Klune",
    rating: 5,
  },
  { id: 5, title: "Normal People", author: "Sally Rooney", rating: 3 },
];

const mockActivity = [
  {
    id: 1,
    text: "Finished Project Hail Mary and gave it 5 stars",
    time: "2 days ago",
  },
  { id: 2, text: "Added Fourth Wing to want to read", time: "3 days ago" },
  { id: 3, text: "Started reading Piranesi", time: "1 week ago" },
  { id: 4, text: "Wrote a review for Normal People", time: "2 weeks ago" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-amber-500 text-sm">
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </span>
  );
}

function Initials({ name }: { name: string }) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("overview");
  const challengePct = Math.round(
    (mockUser.challenge.current / mockUser.challenge.goal) * 100,
  );

  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) {
    redirect("/api/auth/signin");
    return null;
  }

  const tabs: { key: ProfileTab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "shelves", label: "Shelves" },
    { key: "reviews", label: "Reviews" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      {/* Profile Hero */}
      <section className="pt-24 pb-0 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end gap-6 pb-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              {session.user.image ? (
                <Image
                  width={50}
                  height={50}
                  src={session.user.image}
                  alt={session.user.name}
                  className="w-24 h-24 rounded-full border-4 border-white dark:border-slate-950 object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-amber-100 dark:bg-amber-900/30 border-4 border-white dark:border-slate-950 flex items-center justify-center text-3xl font-bold text-amber-800 dark:text-amber-300">
                  <Initials name={session.user.name} />
                </div>
              )}
              <button className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center hover:bg-gray-50 transition">
                <span className="text-xs">📷</span>
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {session.user.name}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
                @{mockUser.handle} · Member since {mockUser.memberSince}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 max-w-lg">
                {mockUser.bio}
              </p>
              <div className="flex gap-4 mt-3">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  📍 {mockUser.location}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  👥 {mockUser.friendCount} friends
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  📚 {mockUser.stats.read} books read
                </span>
              </div>
            </div>

            <button className="flex-shrink-0 self-start mt-2 px-4 py-2 text-sm border border-gray-300 dark:border-slate-700 rounded-lg text-gray-700 dark:text-gray-300 hover:border-amber-600 transition">
              Edit profile
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1">
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
        </div>
      </section>

      {/* Content */}
      <section className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: books */}
              <div className="lg:col-span-2">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { label: "Books read", count: mockUser.stats.read },
                    { label: "Want to read", count: mockUser.stats.wantToRead },
                    { label: "Reading now", count: mockUser.stats.reading },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-gray-200 dark:border-slate-800"
                    >
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {s.count}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Currently reading */}
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                  Currently reading
                </p>
                <div className="space-y-3 mb-8">
                  {mockCurrentlyReading.map((book) => (
                    <div
                      key={book.id}
                      className="flex gap-3 items-center p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800"
                    >
                      <div className="w-10 h-14 bg-amber-100 dark:bg-amber-900/30 rounded flex items-center justify-center text-lg flex-shrink-0">
                        📖
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                          {book.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {book.author}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-20 h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-amber-600 to-orange-600 rounded-full"
                              style={{ width: `${book.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400">
                            {book.progress}%
                          </span>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full flex-shrink-0">
                        Reading
                      </span>
                    </div>
                  ))}
                </div>

                {/* Recently read */}
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                  Recently read
                </p>
                <div className="space-y-3">
                  {mockRecentlyRead.map((book) => (
                    <div
                      key={book.id}
                      className="flex gap-3 items-center p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800"
                    >
                      <div className="w-10 h-14 bg-green-100 dark:bg-green-900/30 rounded flex items-center justify-center text-lg flex-shrink-0">
                        📗
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                          {book.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {book.author}
                        </p>
                        <StarRating rating={book.rating} />
                      </div>
                      <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full flex-shrink-0">
                        Read
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: sidebar */}
              <div className="space-y-4">
                {/* Reading challenge */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-4">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm mb-3">
                    🏆 2025 Reading challenge
                  </p>
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <span>
                      {mockUser.challenge.current} of {mockUser.challenge.goal}{" "}
                      books
                    </span>
                    <span>{challengePct}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-600 to-orange-600 rounded-full"
                      style={{ width: `${challengePct}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    On track ·{" "}
                    {mockUser.challenge.goal - mockUser.challenge.current} books
                    to go
                  </p>
                </div>

                {/* Genres */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-4">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm mb-3">
                    Favourite genres
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {mockUser.genres.map((g) => (
                      <span
                        key={g}
                        className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 rounded-full border border-gray-200 dark:border-slate-700"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Activity */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-4">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm mb-3">
                    Recent activity
                  </p>
                  <div className="space-y-3">
                    {mockActivity.map((a) => (
                      <div key={a.id} className="flex gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                        <div>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            {a.text}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {a.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "shelves" && (
            <div className="py-2 text-gray-500 dark:text-gray-400">
              <ShelfList />
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="text-center py-16 text-gray-500 dark:text-gray-400">
              <p className="text-4xl mb-4">✍️</p>
              <p>No reviews yet. Finish a book and share your thoughts!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
