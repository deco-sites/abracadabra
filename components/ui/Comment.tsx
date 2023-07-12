import Review from "$store/components/ui/Review.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import Like from "$store/components/ui/Like.tsx";
import Image from "deco-sites/std/components/Image.tsx";

import { asset } from "$fresh/runtime.ts";

export interface CommentProps {
  username: string;
  comment: string;
  images?: Array<{
    url?: string;
    alternateName?: string;
  }>;
}

const WIDTH = 620;
const HEIGHT = 620;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

export default function Comment({ username, comment, images }: CommentProps) {
  return (
    <div class="flex flex-col md:flex-row items-start justify-between w-full h-full py-6 gap-6 md:gap-20 border-b border-[#e5e5e5]">
      <div class="flex items-center justify-start h-full min-w-[180px] gap-2">
        <img
          class="object-cover"
          src={asset("/happy-icon.png")}
          width={50}
          height={50}
        />

        <span class="font-bold text-sm text-gray-base">{username}</span>
      </div>
      
      <div class="flex flex-1 flex-col gap-2 items-start justify-between w-full">
        <div class="flex items-center justify-between w-full">
          <Review starNumber={5} text="compra verificada" isGold />
          <span class="text-silver text-sm">12/07/2023</span>
        </div>

        <div class="flex w-full pt-2">
          <span class="text-justify leading-tight">{comment}</span>
        </div>

        {images && (
          <div class="flex w-full">
            {/* Rating Images */}
            <ul class="flex flex-wrap gap-2 overflow-auto">
              {images.map((img, index) => (
                <li class="">
                  <Slider.Dot index={index}>
                    <Image
                      style={{ aspectRatio: ASPECT_RATIO }}
                      class="group-disabled:border-base-300 border border-silver"
                      width={68}
                      height={68}
                      src={img.url!}
                      alt={img.alternateName}
                      fetchPriority="low"
                      loading="eager"
                    />
                  </Slider.Dot>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Like />
      </div>      
    </div>
  )
}
