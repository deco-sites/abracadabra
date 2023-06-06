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

function BannersInferiores({ banners3colunas = [], banners2colunas = [], banner1coluna = [] }: Props) {
  return (
    <div class="container flex row">
        <div class="container grid grid-cols-3 gap-4">
            {banners3colunas.map(({ href, src, alt, width, height }, index) => (
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
        <div class="container grid grid-cols-2 gap-4">
            {banners2colunas.map(({ href, src, alt, width, height }, index) => (
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
        <div class="container grid grid-cols-1 gap-4">
            {banner1coluna.map(({ href, src, alt, width, height }, index) => (
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
    </div>
  );
}

export default BannersInferiores;
