import type { Suggestion } from "deco-sites/std/commerce/types.ts";
import { Signal } from "@preact/signals";
/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import { useEffect, useRef } from "preact/compat";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import Spinner from "$store/components/ui/Spinner.tsx";
import ProductCard from "$store/components/product/ProductCard.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { useAutocomplete } from "deco-sites/std/packs/vtex/hooks/useAutocomplete.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsEvent } from "deco-sites/std/commerce/types.ts";
import { sendEvent } from "$store/sdk/analytics.tsx";

declare global {
  interface Window {
    DECO_SITES_STD: {
      sendAnalyticsEvent: (args: AnalyticsEvent) => void;
    };
  }
}

function CloseButton() {
  const { displaySearchbar } = useUI();

  return (
    <Button
      class="btn-ghost btn-circle"
      onClick={() => (displaySearchbar.value = false)}
    >
      <Icon id="XMark" width={20} height={20} strokeWidth={2} />
    </Button>
  );
}

export interface Props {
  suggestions: Signal<Suggestion | null>;
  loading: boolean;
  variant?: "desktop" | "mobile";
}

function Searchbar({
  suggestions,
  loading,
  variant = "desktop",
}: Props) {
  const hasProducts = Boolean(suggestions.value?.products?.length);
  const hasTerms = Boolean(suggestions.value?.searches?.length);
  const notFound = !hasProducts && !hasTerms;

  return (
    <div class="flex flex-col p-4 md:py-6 md:px-20">
      <div class="flex flex-col gap-6 divide-y divide-base-200 mt-6 empty:mt-0 md:flex-row md:divide-y-0">
        {notFound
          ? (
            <div class="py-16 md:py-6! flex flex-col gap-4 w-full">
              <span
                class="font-medium text-xl text-center"
                role="heading"
                aria-level={3}
              >
                Nenhum resultado encontrado
              </span>
              <span class="text-center text-base-300">
                Vamos tentar de outro jeito? Verifique a ortografia ou use um
                termo diferente
              </span>
            </div>
          )
          : (
            <>
              <div class="flex flex-col gap-6 md:w-[15.25rem] md:max-w-[15.25rem]\">
                <div class="flex gap-2 items-center">
                  <span
                    class="font-medium text-xl"
                    role="heading"
                    aria-level={3}
                  >
                    Sugestões
                  </span>
                  {loading && <Spinner />}
                </div>
                <ul id="search-suggestion" class="flex flex-col gap-6">
                  {suggestions.value!.searches?.map(({ term }) => (
                    <li>
                      <a href={`/s?q=${term}`} class="flex gap-4 items-center">
                        <span>
                          <Icon
                            id="MagnifyingGlass"
                            size={20}
                            strokeWidth={0.01}
                          />
                        </span>
                        <span>
                          {term}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div class="flex flex-col pt-6 md:pt-0 gap-6 overflow-x-hidden">
                <div class="flex gap-2 items-center">
                  <span
                    class="font-medium text-xl"
                    role="heading"
                    aria-level={3}
                  >
                    Produtos sugeridos
                  </span>
                  {loading && <Spinner />}
                </div>
                <Slider class="carousel">
                  {suggestions.value!.products?.map((product, index) => (
                    <Slider.Item
                      index={index}
                      class="carousel-item first:ml-4 last:mr-4 min-w-[200px] max-w-[200px]"
                    >
                      <ProductCard product={product} />
                    </Slider.Item>
                  ))}
                </Slider>
              </div>
            </>
          )}
      </div>
    </div>
  );
}

export default Searchbar;
