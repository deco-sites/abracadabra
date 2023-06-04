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
import { sendEventOnClick } from "$store/sdk/analytics.tsx";
import type { Product } from "deco-sites/std/commerce/types.ts";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

const WIDTH = 200;
const HEIGHT = 279;

function ProductCard({ product, preload, itemListName }: Props) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
    isVariantOf,
  } = product;

  const { listPrice, price, seller, installments, availability } = useOffer(
    offers,
  );

  // http://localhost:8000/bicama-sofa-paglia-carvalho-malva/p?skuId=2012788
  // http://localhost:8000/beliche-contemporanea-com-cama-de-embutir-branco/p?skuId=2006625
  if (
    product.url?.includes("/beliche-contemporanea-com-cama-de-embutir-branco/p")
  ) {
    // TODO: Verificar preços
    // console.log(product);
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

  console.log(possibilities);
  console.log(variants);

  return (
    <div
      class="card card-compact card-bordered p-2 pb-3 border-black rounded-[3px] group w-full"
      data-deco="view-product"
      id={`product-card-${productID}`}
      {...sendEventOnClick(clickEvent)}
    >
      <figure class="relative " style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}>
        {/* Wishlist button */}
        <div class="absolute top-0 right-0 z-10">
          <WishlistIcon productGroupID={productGroupID} productID={productID} />
        </div>
        {/* Product Images */}
        <a
          href={url && relative(url)}
          aria-label="view product"
          class="contents"
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class="absolute transition-opacity rounded w-full opacity-100 group-hover:opacity-0"
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          <Image
            src={back?.url ?? front.url!}
            alt={back?.alternateName ?? front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class="absolute transition-opacity rounded w-full opacity-0 group-hover:opacity-100"
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
      {/* Prices & Name */}
      <div class="">
        <h2 class="">{name}</h2>
        <div class="gap-2">
          {Math.floor((listPrice ?? 0) - (price ?? 0)) > 0 && (
            <div class="flex">
              <span class="line-through text-base-300 text-xs">
                {formatPrice(listPrice, offers!.priceCurrency!)}
              </span>
              <Discount
                listPrice={listPrice ?? 0}
                price={price ?? 0}
                currencySimbol={offers!.priceCurrency!}
              />
            </div>
          )}
          <span class="text-secondary">
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
  );
}

export default ProductCard;
