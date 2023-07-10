import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Stamp {
  title: string;
  /** @description imagem para visualização desktop */
  desktop: LiveImage;
  desktopWidth: number;
  desktopHeight: number;
  /** @description imagem para visualização mobile */
  mobile: LiveImage;
  mobileWidth: number;
  mobileHeight: number;
  alt: string;
}

export interface Props {
  stamps: Stamp[];
}

function Stamps({ stamps }: Props) {
  if (stamps) {
    return (
      <div class="flex flex-col lg:flex-row items-center lg:items-start gap-12 md:gap-20">
        {stamps?.map((
          {
            title,
            desktop,
            desktopWidth,
            desktopHeight,
            mobile,
            mobileWidth,
            mobileHeight,
            alt,
          },
        ) => (
          <div class="flex flex-col items-center lg:items-start">
            <span>{title}</span>
            <Picture>
              <Source
                media="(max-width: 767px)"
                src={mobile}
                width={mobileWidth}
                height={mobileHeight}
              />
              <Source
                media="(min-width: 768px)"
                src={desktop}
                width={desktopWidth}
                height={desktopHeight}
              />
              <img
                class="object-cover"
                src={desktop}
                alt={alt}
              />
            </Picture>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

export default Stamps;
