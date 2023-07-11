interface AggregateRating {
  ratingCount?: number;
  reviewCount?: number;
  ratingValue?: number;
}

interface RatingProps {
  itemReviewed?: string;
  negativeNotes?: string[];
  positiveNotes?: string[];
  reviewAspect?: string;
  reviewBody?: string;
  reviewRating?: AggregateRating;
}

interface Props {
  review?: RatingProps;
}

function Star({ isActive }: { isActive: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={20}
      width={20}
      viewBox="0 0 576 512"
      fill={isActive ? "#ffd700" : "#ccc"}
    >
      <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
    </svg>
  );
}

function calculateActiveIndex(reviewCount: number) {
  let activeIndex;

  if (reviewCount >= 1) {
    activeIndex = 0;
  }

  if (reviewCount > 50) {
    activeIndex = 1;
  }

  if (reviewCount > 100) {
    activeIndex = 2;
  }

  if (reviewCount > 150) {
    activeIndex = 3;
  }

  if (reviewCount > 200) {
    activeIndex = 4;
  }

  return activeIndex;
}

export default function Rating({ review }: Props) {
  const starsNumbers: number[] = [...(new Array(5).keys())];
  const reviewCount = review?.reviewRating?.reviewCount ?? 0;

  const activeIndex = calculateActiveIndex(reviewCount);

  return (
    <div class="flex justify-center items-center gap-2">
      <div class="rating">
        {starsNumbers.map((index) => (
          <Star isActive={index <= activeIndex! ?? false} />
        ))}
      </div>

      <div class="flex items-center justify-center text-sm gap-1">
        <span class="hover:underline">
          ({review?.reviewRating?.reviewCount ?? 0})
        </span>
      </div>
    </div>
  );
}
