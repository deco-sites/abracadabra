import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Modal from "$store/components/ui/Modal.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";

import Counter from "./Counter.tsx";

type Props =
  & Pick<ProductListingPage, "filters" | "pageInfo" | "sortOptions">
  & {
    displayFilter?: boolean;
  };

function SearchControls(
  { filters, pageInfo, displayFilter, sortOptions }: Props,
) {
  const open = useSignal(false);

  return (
    <div class="flex flex-col justify-between mb-4 p-4 sm:mb-0 sm:p-0 sm:gap-4 sm:h-[53px]">
      <div class="flex flex-row items-center justify-between border-b border-base-200 sm:gap-4 sm:border-none">
        <Button
          class={displayFilter ? "btn-ghost" : "btn-ghost sm:hidden"}
          onClick={() => {
            open.value = true;
          }}
        >
          Filtrar
          <Icon id="FilterList" width={16} height={16} />
        </Button>
        <div class={"hidden sm:flex"}>
          {pageInfo.records && <Counter quant={pageInfo.records} />}
        </div>
        {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
      </div>

      <Modal
        loading="lazy"
        title="Filtrar"
        mode="sidebar-right"
        open={open.value}
        onClose={() => {
          open.value = false;
        }}
      >
        <Filters filters={filters} />
      </Modal>
    </div>
  );
}

export default SearchControls;
