"use client";

import { useState } from "react";
import Link from "next/link";
import {useRouter} from 'next/navigation'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const features = [
    {
      title: "Track Your Reading",
      description:
        "Keep track of all the books you've read, are reading, and want to read.",
      icon: "📚",
    },
    {
      title: "Rate & Review",
      description:
        "Share your thoughts with detailed reviews and star ratings for every book.",
      icon: "⭐",
    },
    {
      title: "Discover New Books",
      description:
        "Find your next favorite book through personalized recommendations and trending lists.",
      icon: "🔍",
    },
    {
      title: "Connect with Readers",
      description:
        "Join a community of book lovers and see what your friends are reading.",
      icon: "👥",
    },
    {
      title: "Create Reading Lists",
      description:
        "Organize books into custom lists for different moods, genres, or goals.",
      icon: "📖",
    },
    {
      title: "Reading Challenges",
      description:
        "Set and achieve reading goals with our interactive challenge system.",
      icon: "🎯",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800">
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
              <button className="px-6 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-medium hover:shadow-lg transition" onClick={() => router.push('/books')}>
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
              <button className="w-full px-3 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded font-medium" onClick={() => router.push('/books')}>
                Get Started
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Your Personal{" "}
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Book Library
                </span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Join millions of readers discovering, tracking, and sharing
                their love of books. Find your next favorite book and connect
                with fellow book lovers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition transform hover:-translate-y-1">
                  Start Reading Free
                </button>
                <button className="px-8 py-4 border-2 border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:border-amber-600 dark:hover:border-amber-500 transition">
                  Learn More
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-500">
               ✓ Completely free • ✓ Join instantly
              </p>
            </div>

            {/* Hero Illustration */}
            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-3xl opacity-20 blur-3xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-9xl">📚</div>
                </div>
                {/* Floating Cards */}
                <div className="absolute -top-10 -right-10 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 w-32 transform rotate-12">
                  <div className="text-3xl mb-2">⭐</div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    5★ Rating
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    The Great Gatsby
                  </p>
                </div>
                <div className="absolute -bottom-8 -left-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 w-40 transform -rotate-12">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Reading: 45%
                  </p>
                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-amber-600 to-orange-600 h-2 rounded-full w-5/12"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Love Reading
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Powerful features designed for book lovers, by book lovers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-slate-50 dark:bg-slate-900 rounded-xl hover:shadow-lg transition border border-gray-200 dark:border-slate-800"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Getting Started is Easy
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Three simple steps to start your reading journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Create Your Profile",
                description:
                  "Sign up in seconds and tell us about your reading preferences.",
              },
              {
                step: "2",
                title: "Start Tracking",
                description:
                  "Browse our catalog of millions of books and add them to your shelves.",
              },
              {
                step: "3",
                title: "Connect & Share",
                description:
                  "Join the community, share reviews, and discover what others are reading.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-xl mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section
        id="community"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Join Our Community
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Connect with millions of readers, discuss your favorite books,
                and discover new recommendations from people who share your
                taste.
              </p>
              <ul className="space-y-4">
                {[
                  "Engage with book discussions and author events",
                  "Get personalized reading recommendations",
                  "Create clubs and reading groups with friends",
                  "Earn badges and celebrate reading milestones",
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-2xl">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 h-96 flex items-center justify-center">
                  <div className="text-6xl">👥</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Reading Journey?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Join millions of readers finding their next favorite book on
            OkayReads.
          </p>
          <button className="px-8 py-4 bg-white text-amber-600 rounded-lg font-semibold hover:shadow-lg transition transform hover:-translate-y-1">
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1">
              <h3 className="text-white font-bold mb-4 text-lg">OkayReads</h3>
              <p className="text-sm text-gray-400">
                The world&apos;s largest book database and community for
                readers.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Apps
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400 mb-4 md:mb-0">
                © 2026 OkayReads. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
