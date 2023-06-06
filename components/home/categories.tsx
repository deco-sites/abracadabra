import Image from "deco-sites/std/components/Image.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";

export interface CategoryIcons {
  src: LiveImage;
  alt: string;
  href: string;
  width: number;
  height: number;
}

export interface Props {
  categories?: CategoryIcons[];
}

function CategoryIcons({ categories = [] }: Props) {
  return (
    <div class="container flex column justify-center">
      <div class="hidden sm:flex column justify-center">
        {categories.map(({ href, src, alt, width, height }, index) => (
          <a href={href} class="card card-compact bg-base-100">
            <figure>
              <Image
                class="max-w-full"
                src={src}
                alt={alt}
                width={width}
                height={height}
              />
            </figure>
          </a>
        ))}
      </div>
      <Slider class="sm:hidden carousel carousel-center sm:carousel-end gap-6">
        {categories.map(({ href, src, alt, width, height }, index) => (
          <Slider.Item
            index={index}
            class="carousel-item w-[120px]"
          >
            <a href={href} class="card card-compact bg-base-100">
              <figure>
                <Image
                  class="max-w-full"
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                />
              </figure>
            </a>
          </Slider.Item>
        ))}
      </Slider>
    </div>
  );
}

export default CategoryIcons;
