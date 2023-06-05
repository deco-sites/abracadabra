import Image from "deco-sites/std/components/Image.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface TopbarLeftProp {
  src: LiveImage;
  imgAlt: string;
  imgWidth: number;
  imgHeight: number;
  text: string;
}

export interface TopbarRightProp {
  text: string;
  href: string;
}

export interface Props {
  topbarLeft: TopbarLeftProp[];
  topbarRight: TopbarRightProp[];
}

function Topbar(
  { topbarLeft, topbarRight }: Props,
) {
  if (topbarLeft && topbarRight) {
    return (
      <div class="w-30 hidden sm:flex">
        <div class="container flex justify-between items-center min-h-[35px]">
          <div class="flex flex-row">
            {topbarLeft?.map(({ src, imgAlt, imgWidth, imgHeight, text }) => (
              <div class="flex">
                <figure>
                  <Image
                    src={src}
                    alt={imgAlt}
                    width={imgWidth}
                    height={imgHeight}
                  />
                </figure>
                <div class="flex flex-col ml-[5px]">
                  <span class="font-medium text-[11px]">{text}</span>
                </div>
              </div>
            ))}
          </div>
          <div class="flex flex-row">
            {topbarRight?.map(({ href, text }) => (
              <ul class="flex">
                <li class="flex flex-col mx-[5px]">
                  <a href={href} class="font-medium text-xm">{text}</a>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Topbar;
