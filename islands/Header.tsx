import Modals from "$store/islands/HeaderModals.tsx";
import type { Image } from "deco-sites/std/components/types.ts";
import type { SearchbarProps } from "$store/components/header/Searchbar.tsx";
import type { Props as CampaignTimerProps } from "$store/components/header/CampaignTimer.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";
import type {
  TopbarLeftProp,
  TopbarRightProp,
} from "$store/components/header/Topbar.tsx";

import { useEffect } from "preact/compat";
import { useState } from "preact/hooks";

import CampaignTimer from "$store/components/header/CampaignTimer.tsx";
import Topbar from "$store/components/header/Topbar.tsx";
import AdBar from "$store/components/header/AdBar.tsx";
import Navbar from "$store/components/header/Navbar.tsx";
import ScrollableNavbar from "$store/components/header/ScrollableNavbar.tsx";

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
  campaignTimer?: CampaignTimerProps;
  /**
   * @title Adbar Label
   * @description label that appears in the ad highlighted in red
   */
  adBarLabel?: string;

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
    campaignTimer,
    adBarLabel,
    topbarLeft,
    topbarRight,
    searchbar: _searchbar,
    products,
    navItems = [],
    suggestions,
  }: Props,
) {
  const searchbar = { ..._searchbar, products, suggestions };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        self.window.innerWidth > 600 ? self.scrollY > 500 : self.scrollY > 20
      ) {
        setIsScrolled(true);
      }

      if (self.scrollY === 0) {
        setIsScrolled(false);
      }
    };

    self.addEventListener("scroll", handleScroll);

    return () => {
      self.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header class="z-50 relative">
        <div class="bg-transparent hover:bg-role-neutral-light-1 hover:border-b-role-neutral-light-3 w-full z-50">
          {!isScrolled
            ? (
              <>
                {campaignTimer && <CampaignTimer {...campaignTimer} />}
                <AdBar label={adBarLabel} />
                <Topbar topbarLeft={topbarLeft} topbarRight={topbarRight} />
                <Navbar items={navItems} searchbar={searchbar} />
              </>
            )
            : (
              <div class="fixed w-full bg-base-100">
                <div class="flex md:hidden">
                  <Navbar items={navItems} searchbar={searchbar} />
                </div>

                <div class="hidden md:flex">
                  <ScrollableNavbar items={navItems} searchbar={searchbar} />
                </div>
              </div>
            )}
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
