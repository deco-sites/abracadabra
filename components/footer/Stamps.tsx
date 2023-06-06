import Image from "deco-sites/std/components/Image.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Stamp {
  title: string;
  src: LiveImage;
  alt: string;
  width: number;
  height: number;
}

export interface Props {
  stamps: Stamp[];
}

function Stamps({ stamps }: Props) {
  if (stamps) {
    return (
      <div class="flex flex-row gap-20">
        {stamps?.map(({ title, src, alt, width, height}) => (
          <div class="flex flex-col">
            <span>{title}</span>
            <figure class="mt-[15px]">
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
              />
            </figure>
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
}

export default Stamps;
