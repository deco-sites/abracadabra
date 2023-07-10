import { asset } from "$fresh/runtime.ts";
import Buttons from "$store/islands/HeaderButton.tsx";
import NavItem from "$store/components/header/NavItem.tsx";
import { navbarHeight } from "$store/components/header/constants.ts";
import type { INavItem } from "$store/components/header/NavItem.tsx";
import type { SearchbarProps } from "$store/components/header/Searchbar.tsx";

import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import Searchbar from "$store/islands/HeaderSearchbar.tsx";

import { useState } from "preact/hooks";

export default function ScrollableNavbar({ items, searchbar }: {
  items: INavItem[];
  searchbar: SearchbarProps;
}) {
  const [isOpenedSearchbar, setIsOpenedSearchbar] = useState(false);

  return (
    <header class="flex flex-row justify-center items-center shadow-md w-full h-20 py-12 lg:py-6">
      <div class="flex items-center justify-center gap-4 w-full max-w-[1180px] px-6">
        <a
          href="/"
          class="flex justify-center"
          style={{ minHeight: navbarHeight }}
          aria-label="Store logo"
        >
          <img
            class="object-cover"
            src={asset("/logo_cadabra_site.png")}
            width={52}
            height={40}
          />
        </a>

        <div class="flex flex-wrap items-center justify-center text-gray-base gap-4">
          {items.map((item) => <NavItem item={item} isScrollableNavbar />)}
        </div>

        <>
          <div class="flex items-center justify-center">
            {isOpenedSearchbar
              ? (
                <Button
                  class="btn-square btn-ghost bg-transparent hover:bg-transparent"
                  aria-label="search icon button"
                  onClick={() => setIsOpenedSearchbar(false)}
                >
                  <Icon id="XMark" width={25} height={25} strokeWidth={2} />
                </Button>
              )
              : (
                <Button
                  class="btn-square btn-ghost bg-transparent hover:bg-transparent"
                  aria-label="search icon button"
                  onClick={() => setIsOpenedSearchbar(true)}
                >
                  <Icon id="Search" width={25} height={25} strokeWidth={0.1} />
                </Button>
              )}

            {isOpenedSearchbar && (
              <div class="absolute md:translate-y-16 md:right-20 lg:translate-y-14 lg:right-1/4 max-w-xl bg-white transition-all transform duration-300 ease-in-out">
                <Searchbar searchbar={searchbar} />
              </div>
            )}

            <Buttons variant="cart" />
          </div>
        </>
      </div>
    </header>
  );
}
