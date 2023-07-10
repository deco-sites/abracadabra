import Image from "deco-sites/std/components/Image.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface SocialMediaProps {
  icon: LiveImage;
  alt?: string;
  href: string;
}

export interface Props {
  socialMedias?: SocialMediaProps[];
}

export default function SocialMedias({ socialMedias = [] }: Props) {
  return (
    <div class="grid grid-cols-4 sm:flex sm:flex-wrap items-center sm:justify-center gap-x-12 sm:gap-3 gap-y-4">
      {socialMedias.map((item) => (
        <Image
          src={item.icon}
          alt={item.alt}
          href={item.href}
          width={32}
          height={32}
          class="cursor-pointer"
        />
      ))}
    </div>
  )
}