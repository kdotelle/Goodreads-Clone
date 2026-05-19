import Link from "next/link";
import Image from "next/image";
import StarRating from "../../../components/Book/StarRating";

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    author: string;
    imageLinks?: {
      smallThumbnail: string;
      thumbnail: string;
    };
    rating?: number;
    ratingsCount?: number;
    genre?: string;
    description?: string;
    pageCount?: number;
    publishedDate?: number;
  };
}

async function getBook(id: string): Promise<Book> {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
  const res = await fetch(`${BASE_URL}/volumes/${id}?key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch book");
  return res.json();
}

function MetaStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col items-center px-5 py-3 bg-gray-50 dark:bg-slate-800/60 rounded-xl border border-gray-100 dark:border-slate-700">
      <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">
        {label}
      </span>
      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 text-center">
        {value}
      </span>
    </div>
  );
}

export default async function Book({ params }: { params: Book }) {
  const { id } = await params;
  const book = await getBook(id);
  const { volumeInfo } = book;

  const publishedYear = volumeInfo.publishedDate
    ? new Date(volumeInfo.publishedDate).getFullYear()
    : null;

  console.log(book);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      {/* ── Hero / Cover Banner ── */}
      <section className="pt-24 pb-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
            <Link
              href="/"
              className="hover:text-amber-600 dark:hover:text-amber-500 transition"
            >
              Home
            </Link>
            <span>›</span>
            <Link
              href="/books"
              className="hover:text-amber-600 dark:hover:text-amber-500 transition"
            >
              Books
            </Link>
            <span>›</span>
            <span className="text-gray-700 dark:text-gray-300 truncate max-w-xs">
              {volumeInfo.title}
            </span>
          </nav>

          {/* Main layout: cover + title block */}
          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Cover */}
            <div className="flex-shrink-0">
              <div className="relative">
                {/* Glow behind cover */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl opacity-20 blur-2xl scale-110" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl w-48 md:w-56">
                  {volumeInfo.imageLinks?.thumbnail ? (
                    <Image
                      src={volumeInfo.imageLinks.thumbnail.replace(
                        "http://",
                        "https://",
                      )}
                      alt={volumeInfo.title}
                      width={224}
                      height={336}
                      className="w-full h-auto object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-80 bg-gradient-to-br from-amber-400 to-orange-500 flex items-end justify-center p-4">
                      <span className="text-white font-semibold text-center text-sm leading-tight">
                        {volumeInfo.title}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Title + metadata */}
            <div className="flex-1 min-w-0 pb-8">
              {/* Genre badges */}
              {volumeInfo.categories && volumeInfo.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {volumeInfo.categories.map((category) => (
                    <span
                      key={category}
                      className="inline-block text-xs px-3 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 rounded-full border border-amber-100 dark:border-amber-900 font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-3">
                {volumeInfo.title}
              </h1>

              {volumeInfo.authors && (
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-5">
                  by{" "}
                  <span className="text-amber-600 dark:text-amber-500 font-semibold">
                    {volumeInfo.authors.join(", ")}
                  </span>
                </p>
              )}

              {volumeInfo.averageRating && (
                <div className="mb-6">
                  <StarRating
                    rating={volumeInfo.averageRating}
                    count={volumeInfo.ratingsCount}
                  />
                </div>
              )}

              {/* Stats row */}
              <div className="flex flex-wrap gap-3 mb-8">
                {volumeInfo.pageCount && (
                  <MetaStat label="Pages" value={volumeInfo.pageCount} />
                )}
                {publishedYear && (
                  <MetaStat label="Published" value={publishedYear} />
                )}
                {volumeInfo.publisher && (
                  <MetaStat label="Publisher" value={volumeInfo.publisher} />
                )}
                {volumeInfo.language && (
                  <MetaStat
                    label="Language"
                    value={volumeInfo.language.toUpperCase()}
                  />
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                {/* TODO: wire up shelf/reading list logic */}
                <button className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition transform hover:-translate-y-0.5">
                  Want to Read
                </button>
                <button className="px-6 py-3 border-2 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:border-amber-500 dark:hover:border-amber-500 transition">
                  Currently Reading
                </button>
                {volumeInfo.previewLink && (
                  <a
                    href={volumeInfo.previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border-2 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:border-amber-500 dark:hover:border-amber-500 transition inline-flex items-center gap-2"
                  >
                    Preview
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Description ── */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            {volumeInfo.description && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <span className="inline-block w-1 h-6 bg-gradient-to-b from-amber-600 to-orange-600 rounded-full" />
                  About this book
                </h2>
                <div
                  className="prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-relaxed [&>p]:mb-4 [&>b]:text-gray-800 [&>b]:dark:text-gray-200"
                  dangerouslySetInnerHTML={{ __html: volumeInfo.description }}
                />
              </div>
            )}
          </div>

          {/* Back to search */}
          <div className="mt-12 pt-8 border-t border-gray-100 dark:border-slate-800">
            <Link
              href="/books"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-500 transition"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to book search
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
