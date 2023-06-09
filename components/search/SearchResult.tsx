import Filters from "$store/islands/Filters.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";

export interface FlagProps {
  text: string;
  textColor?: string;
  backgroundColor?: string;
}
export interface ClusterProps {
  id: string;
  flags: FlagProps[];
}
export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns: Columns;
  /**
   * @description Title of page
   */
  title?: string;
  /**
   * @description SEO text of page
   */
  seoText?: string;
  /**
   * @description Cluster Exclusive
   */
  clusterIdExclusiveFlag?: ClusterProps;
  /**
   * @description Cluster config
   */
  cluster?: ClusterProps[];
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>Not Found!</span>
    </div>
  );
}

function Result({
  page,
  variant,
  columns,
  title,
  seoText,
  clusterIdExclusiveFlag,
  cluster,
}: Omit<Props, "page"> & { page: ProductListingPage }) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;

  return (
    <>
      <div class="container max-w-[1180px] px-4 sm:py-10">
        <div class="flex flex-row items-center sm:p-0 mb-2">
          <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
        </div>

        {
          /* <div class="flex flex-col">
          <div>{title}</div>
          <div>{seoText}</div>
        </div> */
        }

        <div class="flex flex-row">
          {filters.length > 0 && (
            <aside class="hidden lg:block w-min min-w-[250px]">
              <Filters filters={filters} />
            </aside>
          )}
          <div class="flex-grow">
            <SearchControls
              sortOptions={sortOptions}
              pageInfo={pageInfo}
              filters={filters}
              displayFilter={variant === "drawer"}
            />

            <ProductGallery
              products={products}
              columns={columns}
              clusterIdExclusiveFlag={clusterIdExclusiveFlag}
              cluster={cluster}
            />
          </div>
        </div>

        <div class="flex justify-center my-4">
          <div class="btn-group">
            <a
              aria-label="previous page link"
              rel="prev"
              href={pageInfo.previousPage ?? "#"}
              class="btn btn-ghost"
            >
              <Icon id="ChevronLeft" width={20} height={20} strokeWidth={2} />
            </a>
            <span class="btn btn-ghost">
              Page {pageInfo.currentPage + 1}
            </span>
            <a
              aria-label="next page link"
              rel="next"
              href={pageInfo.nextPage ?? "#"}
              class="btn btn-ghost"
            >
              <Icon
                id="ChevronRight"
                width={20}
                height={20}
                strokeWidth={2}
              />
            </a>
          </div>
        </div>
      </div>
      <SendEventOnLoad
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: "",
            item_list_id: "",
            items: page.products?.map((product) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult({ page, ...props }: Props) {
  if (!page) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export default SearchResult;
