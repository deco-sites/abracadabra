import ProductCard from "$store/components/product/ProductCard.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { useId } from "preact/hooks";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import { ClusterProps } from "../search/SearchResult.tsx";

export interface Props {
  title: string;
  products: LoaderReturnType<Product[] | null>;
  clusterIdExclusiveFlags?: ClusterProps;
  cluster?: ClusterProps[];
  itemsPerPage?: number;
}

function ProductShelf({
  title,
  products,
  cluster = [],
  clusterIdExclusiveFlags,
}: Props) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div
      id={id}
      class="container w-full sm:w-[1180px] flex-row grid grid-cols-[48px_1fr_48px] grid-rows-[48px_1fr_48px_1fr] px-5 sm:px-0 mb-12"
    >
      <h2 class="text-center lg:text-start row-start-1 col-span-full">
        <span class="font-medium text-2xl">{title}</span>
      </h2>

      <Slider class="flex overflow-x-scroll snap-mandatory scroll-smooth sm:snap-end scrollbar gap-6 col-span-full row-start-2 row-end-5 mt-8">
        {products?.map((product, index) => (
          <Slider.Item
            index={index}
            class="carousel-item w-[270px] sm:w-[292px] mb-4"
          >
            <ProductCard product={product} itemListName={title} cluster={cluster} clusterIdExclusiveFlag={clusterIdExclusiveFlags} />
          </Slider.Item>
        ))}
      </Slider>

      <>
        <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
          <Slider.PrevButton class="btn btn-circle btn-outline absolute right-1/2 bg-base-100">
            <Icon size={20} id="ChevronLeft" strokeWidth={3} />
          </Slider.PrevButton>
        </div>
        <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
          <Slider.NextButton class="btn btn-circle btn-outline absolute left-1/2 bg-base-100">
            <Icon size={20} id="ChevronRight" strokeWidth={3} />
          </Slider.NextButton>
        </div>
      </>
      <SliderJS rootId={id} />
      <SendEventOnLoad
        event={{
          name: "view_item_list",
          params: {
            item_list_name: title,
            items: products.map((product) =>
              mapProductToAnalyticsItem({
                product,
                ...(useOffer(product.offers)),
              })
            ),
          },
        }}
      />
    </div>
  );
}

export default ProductShelf;
