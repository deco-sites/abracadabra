import Image from "deco-sites/std/components/Image.tsx";
import { navbarHeight } from "./constants.ts";

export interface INavItem {
  label: string;
  href: string;
  columns: number;
  children?: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
  image?: { src?: string; alt?: string };
}

function NavItem(
  { item, index, isScrollableNavbar }: {
    item: INavItem;
    index?: number;
    isScrollableNavbar?: boolean;
  },
) {
  const { href, label, children, image, columns } = item;

  return (
    <li class="group flex items-center relative text-[13px] hover:text-yellow-base transition-colors duration-400">
      <a
        href={href}
        class={`${isScrollableNavbar ? `text-xs` : "px-3 py-3 uppercase"} ${
          item.label === "Espaço Casa" && "text-red-base font-bold" ||
          item.label === "OFF" && "font-bold"
        }`}
      >
        {label}
      </a>

      {children && children.length > 0 &&
        (
          <div
            class={`${
              index! > 5 && "-translate-x-1/2 flex-row-reverse"
            } absolute hidden hover:flex group-hover:flex bg-base-100 z-50 justify-start items-stretch border-t border-yellow-base w-[360px] h-[300px]`}
            style={{ top: navbarHeight, left: "0px" }}
          >
            {image?.src && (
              <Image
                src={image.src}
                alt={image.alt}
                width={330}
                height={300}
                loading="lazy"
              />
            )}
            <ul
              class="p-4 bg-white border-t border-yellow-base mt-[-1px]"
              style={{ columnCount: columns }}
            >
              <li class="flex items-center justify-center p-2 border border-gray-base text-gray-base opacity-90 hover:opacity-100 transition-colors duration-100 max-w-[80px]">
                <a href={href}>Ver tudo</a>
              </li>
              {children.map((node) => (
                <li class="p-2 text-gray-base opacity-90 hover:opacity-100 transition-colors duration-100">
                  <a
                    class="block min-w-[170px]"
                    href={node.href}
                  >
                    <span>{node.label}</span>
                  </a>

                  <ul class="flex flex-col gap-1">
                    {node.children?.map((leaf) => (
                      <li>
                        <a class="hover:underline" href={leaf.href}>
                          <span class="text-xs">{leaf.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
