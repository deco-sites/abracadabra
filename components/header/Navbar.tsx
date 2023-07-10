import Searchbar from "$store/islands/HeaderSearchbar.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import NavItem from "./NavItem.tsx";
import { asset } from "$fresh/runtime.ts";
import { navbarHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import Login from "./LoginElement.tsx";
import type { SearchbarProps } from "$store/components/header/Searchbar.tsx";

function Navbar({
  items,
  searchbar,
}: {
  items: INavItem[];
  searchbar: SearchbarProps;
}) {
  const isHome = self.location?.pathname === "/";

  return (
    <>
      {/* Mobile Version */}
      <div
        class="md:hidden flex flex-col justify-between items-center border-b border-base-200 shadow-md w-full h-full px-2 gap-2 py-2 md:py-0"
      >
        <div class="grid grid-cols-3 w-full">
          <div class="flex justify-start">
            <Buttons variant="menu" />
          </div>

          <a
            href="/"
            class="flex justify-center"
            style={{ minHeight: navbarHeight }}
            aria-label="Store logo"
          >
            <img
              class="object-cover"
              src={asset("/logo_cadabra_site.png")}
              width={42}
              height={42}
            />
          </a>

          <div class="flex justify-end">
            <a
              class="btn btn-square btn-ghost bg-transparent hover:bg-transparent"
              href="/login"
              aria-label="Log in"
            >
              <img
                class="object-cover"
                src={asset("/icon-user.png")}
                width={23}
                height={23}
              />
            </a>
            <Buttons variant="cart" />
          </div>
        </div>
        <div class="w-full px-2">
          {isHome && (
            <Searchbar searchbar={searchbar} />
          )}
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden md:flex flex-col max-w-[1180px] mx-auto pl-2 pr-6">
        <div class="lg:container flex flex-row justify-between items-center">
          <div class="md:w-72 lg:w-auto">
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
          <div class="flex-none w-54 flex items-center justify-start gap-2">
            {
              <Login name="" />
              /* <a
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
            </a> */
            }
            <Buttons variant="cart" />
          </div>
        </div>
        <div class="flex-auto flex-wrap flex items-center justify-center w-full max-w-[1180px]">
          {items.map((item) => <NavItem item={item} />)}
        </div>
      </div>
    </>
  );
}

export default Navbar;
