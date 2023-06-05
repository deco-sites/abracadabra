import Searchbar from "$store/islands/HeaderSearchbar.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import NavItem from "./NavItem.tsx";
import { asset } from "$fresh/runtime.ts";
import { navbarHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";

function Navbar({ items, searchbar }: {
  items: INavItem[];
  searchbar: SearchbarProps;
}) {
  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="md:hidden flex flex-row justify-between items-center border-b border-base-200 w-full pl-2 pr-6 gap-2"
      >
        <Buttons variant="menu" />

        <a
          href="/"
          class="flex-grow inline-flex items-center"
          style={{ minHeight: navbarHeight }}
          aria-label="Store logo"
        >
          <Icon id="Logo" width={126} height={16} />
        </a>

        <div class="flex gap-1">
          <Buttons variant="search" />
          <Buttons variant="cart" />
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden md:flex flex-col w-full pl-2 pr-6">
        <div class="container flex flex-row justify-between items-center">
          <div class="flex-none w-44 flex items-center justify-none">
            <Buttons variant="search" />
            <Searchbar searchbar={searchbar} />
          </div>
          <div class="flex-auto flex justify-center">
            <a
              href="/"
              aria-label="Abracadabra"
              class="block px-4 py-3 w-[122px]"
            >
              <img
                class="object-cover"
                src={asset("/logo_cadabra_site.png")}
                width={90}
                height={90}
              />
            </a>
          </div>
          <div class="flex-none w-44 flex items-center justify-end gap-2">
            <a
              class="btn btn-square btn-ghost bg-transparent hover:bg-transparent"
              href="/login"
              aria-label="Log in"
            >
              <img
                class="object-cover"
                src={asset("/icon-user.png")}
                width={20}
                height={23}
              />
            </a>
            <Buttons variant="cart" />
          </div>
        </div>
        <div class="container flex-auto flex justify-center">
          {items.map((item) => <NavItem item={item} />)}
        </div>
      </div>
    </>
  );
}

export default Navbar;
