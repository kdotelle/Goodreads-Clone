export default function StarRating({
  rating,
  count,
}: {
  rating: number;
  count?: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = rating >= star;
          const partial = !filled && rating > star - 1;
          return (
            <span key={star} className="relative inline-block text-xl">
              <span className="text-gray-200 dark:text-slate-700">★</span>
              {(filled || partial) && (
                <span
                  className="absolute inset-0 overflow-hidden text-amber-500"
                  style={{ width: filled ? "100%" : `${(rating % 1) * 100}%` }}
                >
                  ★
                </span>
              )}
            </span>
          );
        })}
      </div>
      <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
        {rating.toFixed(1)}
      </span>
      {count && (
        <span className="text-sm text-gray-500 dark:text-gray-400">
          ({count.toLocaleString()} ratings)
        </span>
      )}
    </div>
  );
}
