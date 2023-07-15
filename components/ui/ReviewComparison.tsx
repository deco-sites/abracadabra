import Review from "$store/components/ui/Review.tsx";
import { asset } from "$fresh/runtime.ts";

function CompletedReview({ label, starNumber, text }: { label: string, starNumber: number, text?: string }) {
  return (
    <div class="flex flex-col items-start">
      <h2 class="text-gray-base text-sm font-bold uppercase">{label}</h2>
      <Review starNumber={starNumber} text={text} isReviewComparison />
    </div>
  )
}

export default function ReviewComparison() {
  return (
    <div class="flex flex-col md:flex-row items-center md:items-start justify-between my-6 w-full h-full shadow-lg py-3 px-12 space-y-8 md:space-y-0">
      <CompletedReview label="Avaliação positiva mais útil" text="Colchão com densidade boa!" starNumber={5} />
      <img
        class="object-cover"
        src={asset("/x-icon.png")}
        width={80}
        height={80}
        alt="X Icon"
      />
      <CompletedReview label="Avaliação Negativa mais útil" text="Ruim" starNumber={0} />
    </div>
  )
}