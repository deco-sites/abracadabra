import Searchbar from "$store/islands/HeaderSearchbar.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import NavItem from "./NavItem.tsx";
import { asset } from "$fresh/runtime.ts";
import { navbarHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import Login from "../home/Login.tsx";
import type { SearchbarProps } from "$store/components/header/Searchbar.tsx";

function Navbar({
  items,
  searchbar,
}: {
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
        <div class="flex justify-start flex-[4_1_0%]">
          <Buttons variant="menu" />
        </div>

        <a
          href="/"
          class="flex  justify-center flex-[5_1_0%]"
          style={{ minHeight: navbarHeight }}
          aria-label="Store logo"
        >
          <img
            class="object-cover"
            src={asset("/logo_cadabra_site.png")}
            width={40}
            height={40}
          />
        </a>

        <div class="flex gap-1 justify-end flex-[3_1_0%]">
          <Buttons variant="search" />
          <Buttons variant="cart" />
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden md:flex flex-col w-[1180px] mx-auto pl-2 pr-6">
        <div class="container flex flex-row justify-between items-center">
          <div class="flex-none w-44 flex items-center justify-none">
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
        <div class="container flex-auto flex justify-center">
          {items.map((item) => <NavItem item={item} />)}
        </div>
      </div>
    </>
  );
}

export default Navbar;
