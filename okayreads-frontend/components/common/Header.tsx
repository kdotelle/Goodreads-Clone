import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeaderProps {
  isLoggedIn: boolean;
  username?: string;
  isHomePage: boolean;
}

export default function Header({ isLoggedIn, username, isHomePage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="fixed w-full top-0 z-50 bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800">
      {isHomePage && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  OkayReads
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 transition"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 transition"
              >
                How It Works
              </a>
              <a
                href="#community"
                className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 transition"
              >
                Community
              </a>
              <button className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 transition font-medium">
                Sign In
              </button>
              <button
                className="px-6 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-medium hover:shadow-lg transition"
                onClick={() => router.push("/books")}
              >
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <a
                href="#features"
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded"
              >
                How It Works
              </a>
              <a
                href="#community"
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded"
              >
                Community
              </a>
              <button className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded font-medium">
                Sign In
              </button>
              <button
                className="w-full px-3 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded font-medium"
                onClick={() => router.push("/books")}
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      )}

      {!isHomePage && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  OkayReads
                </span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/books"
                className="text-amber-600 dark:text-amber-500 font-medium transition"
              >
                Books
              </Link>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 transition"
              >
                My Shelves
              </a>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 transition"
              >
                Community
              </a>
              <button className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 transition font-medium">
                Sign In
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-medium hover:shadow-lg transition">
                Get Started
              </button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <Link
                href="/books"
                className="block px-3 py-2 text-amber-600 dark:text-amber-500 font-medium rounded"
              >
                Books
              </Link>
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded"
              >
                My Shelves
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded"
              >
                Community
              </a>
              <button className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded font-medium">
                Sign In
              </button>
              <button className="w-full px-3 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded font-medium">
                Get Started
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
