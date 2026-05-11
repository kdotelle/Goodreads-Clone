import Link from "next/link";
import Image from "next/image";

interface BookPageProps {
  params: { id: string };
}

interface GoogleBook {
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      large?: string;
      medium?: string;
      thumbnail?: string;
    };
  };
}

async function getBook(id: string): Promise<GoogleBook> {
  const BASE_URL = "https://www.googleapis.com/books/v1";
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
  const res = await fetch(`${BASE_URL}/volumes/${id}?key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch book");
  return res.json();
}

export default async function Book({ params }: { params: BookPageProps }) {
  const { id } = await params;
  const book = await getBook(id);
  const { volumeInfo } = book;

  console.log(book);

  return (
    <main className="p-8">
      <div className="flex flex-col md:flex-row gap-8">
        {volumeInfo.imageLinks?.thumbnail && (
          <Image
            src={volumeInfo.imageLinks.thumbnail}
            alt={volumeInfo.title}
            width={300}
            height={450}
            className="rounded shadow-lg"
          />
        )}
        <div>
          <h1 className="text-4xl font-bold">{volumeInfo.title}</h1>
          <p className="text-xl text-gray-600 mt-2">
            {volumeInfo.authors?.join(", ")}
          </p>
          <div
            className="mt-6 prose"
            dangerouslySetInnerHTML={{ __html: volumeInfo.description || "" }}
          />
          <p className="text-l text-gray-600 mt-2">
            {volumeInfo.categories?.join(", ")}
          </p>
        </div>
      </div>
    </main>
  );
}
