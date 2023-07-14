import { useState } from "preact/hooks";
import Icon from "$store/components/ui/Icon.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";

const IMAGE_SIZE = 78; // Tamanho fixo das imagens

export interface ProductCarouselProps {
  images: Array<{
    url?: string;
    alternateName?: string;
  }>;
}

export default function VerticalCarousel({ images }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, images.length - 6));
  };

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < images.length - 6;

  return (
    <>
      {/* Desktop */}
      <div class="hidden lg:flex flex-col items-center justify-start h-[655px]">
        <button
          onClick={handlePrevClick}
          disabled={!canGoPrev}
          class={`${
            canGoPrev ? "opacity-100" : "opacity-50 pointer-events-none"
          } transform btn btn-circle btn-outline bg-base-100 transition-opacity duration-300`}
        >
          <Icon size={20} id="ChevronUp" strokeWidth={3} />
        </button>
        <div class="flex flex-col transition-transform duration-500 pt-2">
          {images.map((image, index) => (
            <div
              style={{
                display: index >= currentIndex && index < currentIndex + 6
                  ? "block"
                  : "none",
              }}
            >
              <Slider.Dot
                index={index}
                key={index}
              >
                <div
                  class={`h-${IMAGE_SIZE} mb-4 flex items-center justify-center transition-opacity duration-300`}
                >
                  <Image
                    width={IMAGE_SIZE}
                    height={IMAGE_SIZE}
                    class="group-disabled:border-base-300 border border-silver"
                    src={image.url!}
                    alt={image.alternateName}
                  />
                </div>
              </Slider.Dot>
            </div>
          ))}
        </div>
        <button
          onClick={handleNextClick}
          disabled={!canGoNext}
          class={`${
            canGoNext ? "opacity-100" : "opacity-50 pointer-events-none"
          } transform btn btn-circle btn-outline bg-base-100 transition-opacity duration-300`}
        >
          <Icon size={20} id="ChevronDown" strokeWidth={3} />
        </button>
      </div>
    </>
  );
}
