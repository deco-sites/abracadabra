import { lazy, Suspense, useEffect, useRef } from "preact/compat";
import { useState } from "preact/hooks";
import { asset } from "$fresh/runtime.ts";

import { useUI } from "$store/sdk/useUI.ts";
import Loading from "$store/components/ui/Loading.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useAutocomplete } from "$store/sdk/useAutocomplete.ts";

// Editable props
export interface EditableProps {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default O que você está procurando hoje?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;
  /**
   * TODO: Receive querystring from parameter in the server-side
   */
  query?: string;
}

export type SearchbarProps = EditableProps & {
  variant?: "desktop" | "mobile";
};

export interface Props {
  searchbar: SearchbarProps;
}

function Searchbar({ searchbar }: Props) {
  const {
    placeholder = "O que você está procurando hoje?",
    action = "/s",
    name = "q",
    query = "",
    variant = "mobile",
  } = searchbar;
  const { setSearch, suggestions, loading } = useAutocomplete();

  const [focus, setFocus] = useState<boolean>(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const modal = useRef<HTMLDivElement>(null);

  const isMobileCss = !window?.matchMedia?.("(min-width: 768px)")?.matches;

  const searchTerm = searchInputRef.current ? searchInputRef.current.value : "";
  const { displaySearchbar } = useUI();
  const open = (displaySearchbar.value && focus &&
    (searchTerm !== "") && !loading.value &&
    !isMobileCss) ||
    isMobileCss;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modal.current && !modal.current.contains(event.target as HTMLElement) &&
        (searchInputRef.current !== event.target as HTMLInputElement)
      ) {
        setFocus(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modal]);

  return (
    <form
      id="searchbar"
      action={action}
      class="flex-grow flex relative h-[40px] px-0 md:pl-[15px] md:pr-[40px] border-b border-base-200"
    >
      <input
        ref={searchInputRef}
        id="search-input"
        class="flex-grow w-[304px] outline-none placeholder-shown:sibling:hidden placeholder:text-sm lg:placeholder:text-base"
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
          // displaySearchbar.value = true;

          setSearch(value);
        }}
        onClick={() => {
          setFocus(true);
        }}
        placeholder={placeholder}
        role="combobox"
        aria-controls="search-suggestion"
        autocomplete="off"
      />
      {(
        searchInputRef.current && searchInputRef.current.value !== ""
      ) &&
        (
          <button
            type="button"
            aria-label="Clean search"
            class="btn-ghost absolute right-8 bg-transparent hover:bg-transparent top-1/2 translate-y-[-50%]"
            tabIndex={-1}
            onClick={(e) => {
              e.stopPropagation();
              if (searchInputRef.current === null) return;

              searchInputRef.current.value = "";
              displaySearchbar.value = false;
              setSearch("busca vazia");
            }}
          >
            <img
              src={asset("/busca-autocomplete-close.png")}
              class={`h-[20px] w-[20px]`}
            />
          </button>
        )}
      <button
        class="btn-ghost absolute right-0 bg-transparent hover:bg-transparent top-1/2 translate-y-[-50%]"
        aria-label="Search"
        htmlFor="searchbar"
        tabIndex={-1}
      >
        <Icon
          class={`text-yellow-base`}
          id="Search"
          height={23}
          width={21}
          strokeWidth={0.01}
        />
      </button>
    </form>
  );
}

export default Searchbar;
