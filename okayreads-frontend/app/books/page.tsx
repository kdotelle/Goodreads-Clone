"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Books() {
  const [query, setQuery] = useState("");
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

  return (
    <div>
      <h1>Books</h1>
      <p>Welcome to the Books page!</p>
      <input
        style={{ outline: "2px solid black", margin: "5px" }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchBooks}>Search</button>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {volumeInfo.imageLinks?.thumbnail && (
              <Image
                src={book.volumeInfo.imageLinks.thumbnail}
                width={200}
                height={100}
                alt={book.volumeInfo.title}
              />
            )}
            {book.volumeInfo.title} by {book.volumeInfo.authors?.join(", ")}
            <Link href={`/books/${book.id}`}> View Details </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
