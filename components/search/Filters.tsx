import { useState } from "preact/hooks";
import classnames from "$classnames/index.ts";

import Avatar from "$store/components/ui/Avatar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { parseRange } from "deco-sites/std/utils/filters.ts";
import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "deco-sites/std/commerce/types.ts";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

const myFilters = [
  "brand",
  "cor",
  "caracteristicas",
  "acabamento",
  "faixa-de-altura",
  "faixa-de-comprimento",
  "componentes-do-kit",
  "price",
];

const getFilters = (filter: Filter): boolean => myFilters.includes(filter.key);

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <a href={url} class="grid grid-cols-[17px_1fr] items-start gap-2">
      <div
        aria-checked={selected}
        class={classnames(
          "flex",
          "justify-center",
          "items-center",
          "w-[17px]",
          "h-[17px]",
          "border",
          "border-[#6d6e71]",
          "rounded-none",
          "after:flex",
          "after:w-[13px]",
          "after:h-[13px]",
          selected ? "after:bg-yellow-base" : "",
        )}
      />
      <span class="text-sm">{label}</span>
      {/* {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>} */}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" ? "flex-row" : "flex-col";

  return (
    <ul class={`flex flex-wrap gap-3 my-3 ${flexDirection}`}>
      {values.map((item) => {
        const { url, selected, value, quantity } = item;

        if (key === "tamanho") {
          return (
            <a href={url}>
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  // console.log(JSON.stringify(
  //   filters
  //     .filter(isToggle)
  //     .filter(getFilters)
  //     .sort(function (a, b) {
  //       return myFilters.indexOf(a.key) - myFilters.indexOf(b.key);
  //     }),
  // ));

  return (
    <ul class="flex flex-col p-4">
      {filters
        .filter(isToggle)
        .filter(getFilters)
        .sort(function (a, b) {
          return myFilters.indexOf(a.key) - myFilters.indexOf(b.key);
        })
        .map((filter) => (
          <li
            class={classnames(
              "flex",
              "flex-col",
              "gap-4",
            )}
          >
            <div class={"collapse"}>
              <input type="checkbox" name="pdc-filters" class={"min-h-0"} />
              <div
                class={classnames(
                  "collapse-title",
                  "flex",
                  "justify-between",
                  "cursor-pointer",
                  "border-b",
                  "border-gray-light",
                  "p-0",
                  "min-h-0",
                )}
                onClick={() => {
                  // if (open.includes(filter.key)) {
                  //   const myArray = JSON.parse(JSON.stringify(open));
                  //   const index = myArray.indexOf(filter.key);
                  //   myArray.splice(index, 1);
                  //   setOpen([...myArray]);
                  // } else {
                  //   setOpen([...open, filter.key]);
                  // }
                }}
              >
                <span class={"flex content-center flex-wrap h-9"}>
                  {filter.label}
                </span>
                <span class={"flex content-center flex-wrap"}>
                  <Icon
                    class={classnames(
                      "text-gray-medium",
                      "h-[8px]",
                      "w-[14px]",
                      // open.includes(filter.key) ? "rotate-180" : "",
                      "transition-all",
                      "duration-500",
                    )}
                    id="FilterArrow"
                  />
                </span>
              </div>
              <div
                class={classnames(
                  "collapse-content",
                  "transition-all",
                  "duration-700",
                  "overflow-auto",
                  "p-0",
                  // open.includes(filter.key) ? "max-h-[390px]" : "max-h-0",
                )}
              >
                <FilterValues {...filter} />
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default Filters;