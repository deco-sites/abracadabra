import Modals from "$store/islands/HeaderModals.tsx";
import type { Image } from "deco-sites/std/components/types.ts";
import type { SearchbarProps } from "$store/components/header/Searchbar.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";
import type { TopbarLeftProp, TopbarRightProp } from "./Topbar.tsx";

import Topbar from "./Topbar.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight, navbarHeight } from "./constants.ts";

export interface NavItem {
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
  image?: {
    src?: Image;
    alt?: string;
  };
}

export interface Props {
  topbarLeft: TopbarLeftProp[];
  topbarRight: TopbarRightProp[];
  /** @title Search Bar */
  searchbar?: SearchbarProps;
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItem[];

  /**
   * @title Product suggestions
   * @description Product suggestions displayed on search
   */
  products?: LoaderReturnType<Product[] | null>;

  /**
   * @title Enable Top Search terms
   */
  suggestions?: LoaderReturnType<Suggestion | null>;
}

function Header(
  {
    topbarLeft,
    topbarRight,
    searchbar: _searchbar,
    products,
    navItems = [],
    suggestions,
  }: Props,
) {
  const searchbar = { ..._searchbar, products, suggestions };

  console.log({ searchbar });

  return (
    <>
      <header class="z-50 relative">
        <div class="bg-transparent hover:bg-role-neutral-light-1 hover:border-b-role-neutral-light-3 w-full z-50">
          <Topbar topbarLeft={topbarLeft} topbarRight={topbarRight} />
          <Navbar items={navItems} searchbar={searchbar} />
        </div>

        <Modals
          menu={{ items: navItems }}
          searchbar={searchbar}
        />
      </header>
    </>
  );
}

export default Header;
