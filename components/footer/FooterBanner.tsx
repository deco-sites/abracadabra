import Image from "deco-sites/std/components/Image.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface FooterBanner {
  src: LiveImage;
  alt: string;
  width: number;
  height: number;
}

export interface Props {
  banner?: FooterBanner[];
}

function Banner({ banner = [] }: Props) {
  if (banner) {
    const { src, alt, width, height } = banner[0];

    return (
      <div className="container flex row w-100">
        <figure key={src}>
          <Image
            className="max-w-full"
            src={src}
            alt={alt}
            width={width}
            height={height}
          />
        </figure>
      </div>
    );
  } else {
    return null;
  }
}

export default Banner