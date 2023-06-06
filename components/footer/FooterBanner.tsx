import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface FooterBanner {
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
  banner?: FooterBanner[];
}

function Banner({ banner = [] }: Props) {
  if (banner) {
    const {
      desktop,
      desktopWidth,
      desktopHeight,
      mobile,
      mobileWidth,
      mobileHeight,
      alt,
    } = banner[0];

    return (
      <div className="container flex row w-100">
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
            class="object-cover w-full"
            src={desktop}
            alt={alt}
          />
        </Picture>
      </div>
    );
  } else {
    return null;
  }
}

export default Banner;
