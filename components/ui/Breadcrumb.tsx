import type { BreadcrumbList } from "deco-sites/std/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
  hasMarginTop?: boolean;
}

function Breadcrumb({ itemListElement = [], hasMarginTop = true }: Props) {
  const items = [{ name: "Abra Cadabra", item: "/" }, ...itemListElement];

  return (
    <div
      class={`hidden md:block breadcrumbs font-light text-sm text-start px-4 ${
        hasMarginTop && "my-[10px]"
      }`}
    >
      <ul>
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }) => (
            <li>
              <a href={item}>{name}</a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Breadcrumb;
