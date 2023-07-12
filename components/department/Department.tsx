import Image from "deco-sites/std/components/Image.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface DepartmentBanner {
  src: LiveImage;
  alt: string;
  href?: string;
  width: number;
  height: number;
}

export interface Props {
  title?: string;
  text?: string;
  banner: DepartmentBanner;
}

const Department = (props: Props) => {
  const { banner, title, text } = props;

  return (
    <div class="flex flex-col justify-center items-center">
      <a href={banner.href}>
        <Image
          src={banner.src}
          alt={banner.alt}
          width={banner.width}
          height={banner.height}
        />
      </a>
      <h1 class="text-4xl mt-4 mb-4 text-gray-base">{title}</h1>
      <p class="max-w-5xl mx-auto text-center text-gray-base text-base leading-6">
        {text}
      </p>
    </div>
  );
};

export default Department;
