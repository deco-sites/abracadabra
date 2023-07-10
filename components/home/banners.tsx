import Image from "deco-sites/std/components/Image.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Banners3ColunasProps {
  src: LiveImage;
  alt: string;
  href: string;
  width: number;
  height: number;
}

export interface Banners2ColunasProps {
  src: LiveImage;
  alt: string;
  href: string;
  width: number;
  height: number;
}

export interface Banner1ColunaProps {
  src: LiveImage;
  alt: string;
  href: string;
  width: number;
  height: number;
}

export interface Props {
  banners3colunas?: Banners3ColunasProps[];
  banners2colunas?: Banners2ColunasProps[];
  banner1coluna?: Banner1ColunaProps[];
}

function LowerBanners(
  { banners3colunas = [], banners2colunas = [], banner1coluna = [] }: Props,
) {
  return (
    <div class="container w-full sm:w-[1180px] flex-row">
      <div class="container grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 px-2 md:px-0">
        {banners3colunas.map(({ href, src, alt, width, height }, index) => (
          <a href={href} class="flex justify-center">
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
      <div class="container grid grid-cols-1 sm:grid-cols-2 gap-4 py-6">
        {banners2colunas.map(({ href, src, alt, width, height }, index) => (
          <a href={href} class="flex justify-center">
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
      <div class="container grid grid-cols-1 gap-4 py-6">
        {banner1coluna.map(({ href, src, alt, width, height }, index) => (
          <a href={href} class="flex justify-center">
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
    </div>
  );
}

export default LowerBanners;
