import Image from "deco-sites/std/components/Image.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import WishlistIcon from "$store/islands/WishlistButton.tsx";
import AddToCartButton from "$store/islands/AddToCartButton.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import Installments from "./Installments.tsx";
import Discount from "./Discount.tsx";

import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { SendEventOnClick } from "$store/sdk/analytics.tsx";
import type { Product } from "deco-sites/std/commerce/types.ts";
import { ClusterProps } from "../search/SearchResult.tsx";
import Clusters, { ClusterBadge } from "./Clusters.tsx";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;
  clusterIdExclusiveFlag?: ClusterProps;
  cluster?: ClusterProps[];

  /** @description used for analytics event */
  itemListName?: string;
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

const DESKTOP_IMAGE_SIZE = {
  WIDTH: 271,
  HEIGHT: 259,
};

const MOBILE_IMAGE_SIZE = {
  WIDTH: 271,
  HEIGHT: 259,
};

function ProductCard(
  { product, preload, itemListName, clusterIdExclusiveFlag, cluster }: Props,
) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
    isVariantOf,
    additionalProperty,
  } = product;

  const id = `product-card-${productID}`;

  const { listPrice, price, seller, installments, availability } = useOffer(
    offers,
  );

  // http://localhost:8000/bicama-sofa-paglia-carvalho-malva/p?skuId=2012788
  // http://localhost:8000/beliche-contemporanea-com-cama-de-embutir-branco/p?skuId=2006625
  // https://www.abracadabra.com.br/beliche-montessoriana-madeira-/p
  // https://www.abracadabra.com.br/bicama-zuka-com-3gavetas-branco/p
  // https://www.abracadabra.com.br/bicama-square-branco-fosco/p
  if (
    product.url?.includes("/bicama-square-branco-fosco/p")
  ) {
    // TODO: Verificar preços
    // console.log(isVariantOf);
    // console.log(JSON.stringify(product.additionalProperty));
    // console.log(JSON.stringify(product));
    // console.log(offers);
    // console.log({ listPrice, price, seller, installments, availability });
  }

  const productGroupID = isVariantOf?.productGroupID;
  const [front, back] = images ?? [];

  const possibilities = useVariantPossibilities(product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});
  const clickEvent = {
    name: "select_item" as const,
    params: {
      item_list_name: itemListName,
      items: [
        mapProductToAnalyticsItem({
          product,
          price,
          listPrice,
        }),
      ],
    },
  };

  return (
    <div
      id={id}
      class="card card-compact card-bordered justify-between p-2 pb-3 border-black-opacity80 rounded-[3px] group w-full h-full"
      data-deco="view-product"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
      <div class="mb-4">
        <figure
          class="relative mb-[6px] sm:mb-3"
          style={{
            aspectRatio:
              `${DESKTOP_IMAGE_SIZE.WIDTH} / ${DESKTOP_IMAGE_SIZE.HEIGHT}`,
          }}
        >
          {/* Wishlist button */}
          {
            /* <div class="absolute top-0 right-0 z-10">
            <WishlistIcon
              productGroupID={productGroupID}
              productID={productID}
            />
          </div> */
          }
          {/* Exclusive Product Tag */}
          {clusterIdExclusiveFlag && (
            <div class={"absolute z-10 top-1.5 left-1.5"}>
              <Clusters
                cluster={[clusterIdExclusiveFlag]}
                additionalProperty={additionalProperty}
                class={"flex px-2 py-1 h-4 sm:h-6 text-[8px] leading-3 sm:text-[12px] sm:leading-4"}
              />
            </div>
          )}
          {/* Product Images */}
          <a
            href={url && relative(url)}
            aria-label="view product"
            class="contents"
          >
            <Image
              src={front.url!}
              alt={front.alternateName}
              width={DESKTOP_IMAGE_SIZE.WIDTH}
              height={DESKTOP_IMAGE_SIZE.HEIGHT}
              class="absolute transition-opacity rounded-[3px] w-full opacity-100 group-hover:opacity-0"
              sizes="(max-width: 640px) 50vw, 20vw"
              preload={preload}
              loading={preload ? "eager" : "lazy"}
              decoding="async"
            />
            <Image
              src={back?.url ?? front.url!}
              alt={back?.alternateName ?? front.alternateName}
              width={DESKTOP_IMAGE_SIZE.WIDTH}
              height={DESKTOP_IMAGE_SIZE.HEIGHT}
              class="absolute transition-opacity rounded-[3px] w-full opacity-0 group-hover:opacity-100"
              sizes="(max-width: 640px) 50vw, 20vw"
              loading="lazy"
              decoding="async"
            />
          </a>

          {/* SKU Selector */}
          {
            /* <figcaption class="glass card-body card-actions absolute bottom-0 left-0 w-full transition-opacity opacity-0 group-hover:opacity-100">
          <ul class="flex justify-center items-center gap-2 w-full">
            {variants.map(([value, [link]]) => (
              <a href={link}>
                <Avatar
                  variant={link === url ? "active" : "default"}
                  content={value}
                />
              </a>
            ))}
          </ul>
        </figcaption> */
          }
        </figure>
        <div
          class={"flex flex-col lg:flex-row justify-between min-h-9 lg:min-h-6 mb-2"}
        >
          <Clusters
            cluster={cluster}
            additionalProperty={additionalProperty}
            class="lg:w-[calc(50%-0.25rem)] gap-2 content-center justify-center min-h-4 lg:min-h-6 text-center"
          />
        </div>
        {/* Name */}
        <h2 class="text-sm">{name}</h2>
      </div>
      <div>
        <div class="">
          {/* Prices */}
          <div class="gap-2">
            {Math.floor((listPrice ?? 0) - (price ?? 0)) > 0 && (
              <div class="flex flex-col-reverse sm:flex-row gap-2 items-start sm:items-center">
                <span class="line-through text-gray-base text-sm leading-[22px]">
                  {formatPrice(listPrice, offers!.priceCurrency!)}
                </span>
                <Discount
                  listPrice={listPrice ?? 0}
                  price={price ?? 0}
                  currencySimbol={offers!.priceCurrency!}
                />
              </div>
            )}
            <span class="text-black font-extrabold text-[17px] leading-[22px]">
              {formatPrice(price, offers!.priceCurrency!)}
            </span>
          </div>
          <span class={"flex"}>
            <Installments installments={installments} />
          </span>
        </div>
        <div>
          {availability === "https://schema.org/InStock"
            ? (
              <>
                {seller && (
                  <AddToCartButton
                    text="ADICIONAR AO CARRINHO"
                    skuId={productID}
                    sellerId={seller}
                    quantity={1}
                    price={price ?? 0}
                    discount={price && listPrice ? listPrice - price : 0}
                    name={product.name ?? ""}
                    productGroupId={product.isVariantOf?.productGroupID ?? ""}
                  />
                )}
              </>
            )
            : <OutOfStock productID={productID} />}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
