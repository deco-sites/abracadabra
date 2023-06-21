import { lazy, Suspense, useEffect, useRef } from "preact/compat";

import { useUI } from "$store/sdk/useUI.ts";
import Loading from "$store/components/ui/Loading.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import { headerHeight } from "$store/components/header/constants.ts";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useAutocomplete } from "deco-sites/std/packs/vtex/hooks/useAutocomplete.ts";

const LazySearchbar = lazy(() =>
  import("$store/components/search/Searchbar.tsx")
);

interface Props {
  searchbar: SearchbarProps;
}

function Searchbar({ searchbar }: Props) {
  const {
    placeholder = "O que você está procurando hoje?",
    action = "/s",
    name = "q",
    query,
    variant = "mobile",
  } = searchbar;
  const { setSearch, suggestions, loading } = useAutocomplete();

  const searchInputRef = useRef<HTMLInputElement>(null);

  const { displaySearchbar } = useUI();
  const open = displaySearchbar.value &&
    window?.matchMedia?.("(min-width: 768px)")?.matches;

  return (
    <>
      <form
        id="searchbar"
        action={action}
        class="flex-grow flex relative h-[40px] px-0 pl-[15px] pr-[40px] border-b border-base-200"
      >
        <input
          ref={searchInputRef}
          id="search-input"
          class="flex-grow w-[304px] outline-none placeholder-shown:sibling:hidden"
          name={name}
          defaultValue={query}
          onInput={(e) => {
            const value = e.currentTarget.value;

            if (value) {
              sendEvent({
                name: "search",
                params: { search_term: value },
              });
            }

            setSearch(value);
          }}
          placeholder={placeholder}
          role="combobox"
          aria-controls="search-suggestion"
          autocomplete="off"
        />
        {open && (
          <button
            type="button"
            aria-label="Clean search"
            class="focus:outline-none"
            tabIndex={-1}
            onClick={(e) => {
              e.stopPropagation();
              if (searchInputRef.current === null) return;

              searchInputRef.current.value = "";
              setSearch("");
            }}
          >
            <span class="text-sm">limpar</span>
          </button>
        )}
        <Button
          class="btn-ghost absolute right-0"
          aria-label="Search"
          htmlFor="searchbar"
          tabIndex={-1}
        >
          <Icon
            fill="yellow"
            id="Search"
            size={20}
            strokeWidth={0.01}
          />
        </Button>
      </form>
      <div
        class={`${
          open ? "block border-y border-base-200 shadow" : "hidden"
        } absolute left-0 top-0 w-screen z-50 bg-base-100`}
        style={{ marginTop: headerHeight }}
      >
        {open && (
          <Suspense fallback={<Loading />}>
            <LazySearchbar {...searchbar} variant="desktop" />
          </Suspense>
        )}
      </div>
    </>
  );
}

export default Searchbar;
