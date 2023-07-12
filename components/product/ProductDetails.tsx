import { useId } from "preact/hooks";
import AddToCartButtonWithQuantitySelector from "$store/islands/AddToCartWithQuantitySelector.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Discount from "./Discount.tsx";
import Installments from "./Installments.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/components/ui/SliderJS.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import type { Props as ProductShelfProps } from "$store/components/product/ProductShelf.tsx";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";
import type { LoaderReturnType } from "$live/types.ts";

import ImpresionContent from "$store/components/ui/ImpresionContent.tsx";
import Comment from "$store/components/ui/Comment.tsx";
import RatingContent from "$store/components/ui/RatingContent.tsx";
import Rating from "$store/components/ui/Rating.tsx";
import Review from "$store/components/ui/Review.tsx";
import DiscountPercentage from "$store/components/product/DiscountPercentage.tsx";
import ProductSelector from "./ProductVariantSelector.tsx";
import ProductShelf from "$store/components/product/ProductShelf.tsx";
import ProductImageZoom from "$store/islands/ProductImageZoom.tsx";
import WishlistButton from "../wishlist/WishlistButton.tsx";

export type Variant = "front-back" | "slider" | "auto";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
  /**
   * @title Product view
   * @description Ask for the developer to remove this option since this is here to help development only and should not be used in production
   */
  variant?: Variant;
}

const WIDTH = 620;
const HEIGHT = 620;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */
function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <span class="font-medium text-2xl">Página não encontrada</span>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function ProductInfo({ page }: { page: ProductDetailsPage }) {
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    description,
    productID,
    offers,
    name,
    gtin,
    isVariantOf,
    review,
  } = product;
  const { price, listPrice, seller, installments, availability } = useOffer(
    offers,
  );

  return (
    <>
      {/* Code and name */}
      <div class="flex flex-col items-center justify-center lg:items-start lg:justify-start gap-2">
        <h1>
          <span class="font-medium text-[17px] sm:text-xl leading-[21px]">
            {name}
          </span>
        </h1>
        <div>
          <span class="text-xs text-gray-base font-light">
            Cod. {isVariantOf?.model}
          </span>
        </div>
      </div>
      <div class="w-full flex flex-col sm:flex-row items-center justify-center gap-1 my-4">
        <div class="py-1 uppercase w-full flex items-center font-bold bg-rosybrown text-white text-xs justify-center">
          Exclusivo
        </div>
        <div class="py-1 uppercase w-full flex items-center font-bold bg-blue-base text-white text-xs justify-center">
          Pronta entrega
        </div>
      </div>
      <div class="flex justify-center lg:justify-start my-7">
        <Rating review={review} />
      </div>
      {/* Prices */}
      <div class="mt-4 flex flex-col items-center justify-center lg:items-start lg:justify-start">
        <div class="flex lg:items-end justify-start gap-6">
          <div>
            {Math.floor((listPrice ?? 0) - (price ?? 0)) > 0 && (
              <div class="flex flex-col-reverse sm:flex-row gap-2 items-start sm:items-center">
                <span class="line-through text-gray-base font-bold leading-[22px]">
                  {formatPrice(listPrice, offers!.priceCurrency!)}
                </span>
              </div>
            )}
            <span class="text-black font-bold leading-[22px]">
              {formatPrice(price, offers!.priceCurrency!)}
            </span>
          </div>
          <div class="hidden lg:block">
            <Discount
              listPrice={listPrice ?? 0}
              price={price ?? 0}
              currencySimbol={offers!.priceCurrency!}
            />
          </div>
        </div>
        <span class="flex">
          <Installments installments={installments} />
        </span>
      </div>
      {/* Sku Selector */}
      <div class="mt-4 sm:mt-6">
        <ProductSelector product={product} />
      </div>
      {/* Add to Cart and Favorites button */}
      <div class="mt-2 flex flex-col gap-2">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              {seller && (
                <AddToCartButtonWithQuantitySelector
                  skuId={productID}
                  sellerId={seller}
                  price={price ?? 0}
                  discount={price && listPrice ? listPrice - price : 0}
                  name={product.name ?? ""}
                  productGroupId={product.isVariantOf?.productGroupID ?? ""}
                />
              )}
              {
                /* <WishlistButton
                variant="full"
                productGroupID={isVariantOf?.productGroupID}
                productID={productID}
              /> */
              }
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>
      {/* Shipping Simulation */}
      <div class="mt-8">
        <ShippingSimulation
          items={[{
            id: Number(product.sku),
            quantity: 1,
            seller: seller ?? "1",
          }]}
        />
      </div>
      {/* Analytics Event */}
      <SendEventOnLoad
        event={{
          name: "view_item",
          params: {
            items: [
              mapProductToAnalyticsItem({
                product,
                breadcrumbList,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
    </>
  );
}

/**
 * Here be dragons
 *
 * bravtexfashionstore (VTEX default fashion account) has the same images for different skus. However,
 * VTEX api does not return the same link for the same image. This causes the image to blink when
 * the user changes the selected SKU. To prevent this blink from happening, I created this function
 * bellow to use the same link for all skus. Example:
 *
 * {
    skus: [
      {
        id: 1
        image: [
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/123/a.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/124/b.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/125/c.jpg"
        ]
      },
      {
        id: 2
        image: [
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/321/a.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/322/b.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/323/c.jpg"
        ]
      }
    ]
  }

  for both skus 1 and 2, we have the same images a.jpg, b.jpg and c.jpg, but
  they have different urls. This function returns, for both skus:

  [
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/321/a.jpg",
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/322/b.jpg",
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/323/c.jpg"
  ]

  This is a very catalog dependent function. Feel free to change this as you wish
 */
const useStableImages = (product: ProductDetailsPage["product"]) => {
  const imageNameFromURL = (url = "") => {
    const segments = new URL(url).pathname.split("/");
    return segments[segments.length - 1];
  };

  const images = product.image ?? [];
  const allImages = product.isVariantOf?.hasVariant.flatMap((p) => p.image)
    .reduce((acc, img) => {
      if (img?.url) {
        acc[imageNameFromURL(img.url)] = img.url;
      }
      return acc;
    }, {} as Record<string, string>) ?? {};

  return images.map((img) => {
    const name = imageNameFromURL(img.url);

    return { ...img, url: allImages[name] ?? img.url };
  });
};

function Details({
  page,
  variant,
}: { page: ProductDetailsPage; variant: Variant }) {
  const { product, breadcrumbList } = page;
  const id = `product-image-gallery:${useId()}`;
  const images = useStableImages(product);
  const slicedImages = images.slice(0, 6);

  const { description } = product;

  const { price, listPrice } = useOffer(
    product.offers,
  );

  /**
   * Product slider variant
   *
   * Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
   * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
   * we rearrange each cell with col-start- directives
   */
  if (variant === "slider") {
    return (
      <>
        {/* Breadcrumb */}
        <Breadcrumb
          itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
          hasMarginTop={false}
        />

        <div
          id={id}
          class="grid grid-cols-1 gap-4 lg:grid-cols-[max-content_1fr_316px] lg:grid-rows-1 lg:justify-center px-2 md:px-6"
        >
          {/* Image Slider */}
          <div class="relative lg:col-start-2 lg:col-span-1 lg:row-start-1">
            <DiscountPercentage
              price={price ?? 0}
              listPrice={listPrice ?? 0}
            />
            <Slider class="carousel gap-6">
              {slicedImages.map((img, index) => (
                <Slider.Item
                  index={index}
                  class="carousel-item w-full group"
                >
                  <Image
                    class="w-full duration-100 transition-scale scale-100 lg:group-hover:scale-125 cursor-pointer"
                    sizes="(max-width: 640px) 100vw, 40vw"
                    style={{ aspectRatio: ASPECT_RATIO }}
                    src={img.url!}
                    alt={img.alternateName}
                    width={WIDTH}
                    height={HEIGHT}
                    // Preload LCP image for better web vitals
                    preload={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </Slider.Item>
              ))}
            </Slider>
          </div>

          {/* Dots */}
          <ul class="flex gap-2 lg:justify-start overflow-auto px-4 lg:px-0 lg:flex-col lg:col-start-1 lg:col-span-1 lg:row-start-1">
            {slicedImages.map((img, index) => (
              <li class="">
                <Slider.Dot index={index}>
                  <Image
                    style={{ aspectRatio: ASPECT_RATIO }}
                    class="group-disabled:border-base-300 border border-silver"
                    width={78}
                    height={78}
                    src={img.url!}
                    alt={img.alternateName}
                  />
                </Slider.Dot>
              </li>
            ))}
          </ul>

          {/* Product Info */}
          <div class="px-4 lg:pr-0 lg:pl-6 lg:col-start-3 lg:col-span-1 lg:row-start-1">
            <ProductInfo page={page} />
          </div>
        </div>
        <SliderJS rootId={id} actionType="mouseover"></SliderJS>

        <div class="w-full flex flex-col mt-24">
          {/* Review Info */}
          <div class="mt-4 sm:mt-6 px-4">
            <h2 class={"border-b border-[#e5e5e5] mb-8 py-3 text-2xl"}>
              Opinião de quem comprou
            </h2>
            <div class="flex flex-col md:flex-row items-start w-full gap-8 md:gap-36 mb-8">
              <ImpresionContent />
              <div class="flex flex-col items-start gap-4">
                <Review starNumber={4} text="Excelente" />
                <Review starNumber={4} text="Altíssima qualidade" />
              </div>
            </div>
          </div>

          {/* Description card */}
          <div class="mt-4 sm:mt-6 px-4">
            <h2 class={"border-b border-[#e5e5e5] mb-8 py-3 text-2xl"}>
              Sobre o produto
            </h2>
            {description && (
              <div
                class="text-base font-normal mb-8"
                dangerouslySetInnerHTML={{ "__html": description }}
              />
            )}
          </div>

          {/* Tecnical information */}
          <div class="mt-4 sm:mt-6 px-4">
            <h2 class={"border-b border-[#e5e5e5] mb-8 py-3 text-2xl"}>
              Informações técnicas
            </h2>
            {description && (
              <div
                class="text-base font-normal mb-8"
                dangerouslySetInnerHTML={{ "__html": description }}
              />
            )}
          </div>

          {/* Product Shelfs */}
          {/* <ProductShelf
            title="Relacionados"
            products={null}
            itemsPerPage={4}
          /> */}

          {/* Rating */}
          <div class="mt-4 sm:mt-6 px-4">
            <h2 class={"border-b border-[#e5e5e5] mb-8 py-3 text-2xl"}>
              Avaliações do Produto
            </h2>
            <div class="flex flex-col md:flex-row items-start w-full gap-8 md:gap-12 pb-8 border-b border-[#e5e5e5]">
              <RatingContent />
              {/* Rating Images */}
              <ul class="flex flex-wrap gap-2 overflow-auto">
                {slicedImages.map((img, index) => (
                  <li class="">
                    <Slider.Dot index={index}>
                      <Image
                        style={{ aspectRatio: ASPECT_RATIO }}
                        class="group-disabled:border-base-300 border border-silver"
                        width={78}
                        height={78}
                        src={img.url!}
                        alt={img.alternateName}
                        loading="eager"
                      />
                    </Slider.Dot>
                  </li>
                ))}
              </ul>
            </div>
            <Comment
              username="Marcelo"
              comment="Bom! Conforme o esperado"
              images={slicedImages}
            />
            <Comment
              username="Roberto Silva"
              comment="Produto de qualidade impecável!"
            />
            <Comment
              username="Marcelo"
              comment="Bom! Conforme o esperado"
              images={slicedImages}
            />
          </div>
        </div>
      </>
    );
  }

  /**
   * Product front-back variant.
   *
   * Renders two images side by side both on mobile and on desktop. On mobile, the overflow is
   * reached causing a scrollbar to be rendered.
   */
  return (
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-[50vw_25vw] sm:grid-rows-1 sm:justify-center">
      {/* Image slider */}
      <ul class="carousel carousel-center gap-6">
        {[slicedImages[0], slicedImages[1] ?? slicedImages[0]].map((
          img,
          index,
        ) => (
          <li class="carousel-item min-w-[100vw] sm:min-w-[24vw]">
            <Image
              sizes="(max-width: 640px) 100vw, 24vw"
              style={{ aspectRatio: ASPECT_RATIO }}
              src={img.url!}
              alt={img.alternateName}
              width={WIDTH}
              height={HEIGHT}
              // Preload LCP image for better web vitals
              preload={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </li>
        ))}
      </ul>

      {/* Product Info */}
      <div class="px-4 sm:pr-0 sm:pl-6">
        <ProductInfo page={page} />
      </div>
    </div>
  );
}

function ProductDetails({ page, variant: maybeVar = "auto" }: Props) {
  console.log(JSON.stringify(page?.product));

  /**
   * Showcase the different product views we have on this template. In case there are less
   * than two images, render a front-back, otherwhise render a slider
   * Remove one of them and go with the best suited for your use case.
   */
  const variant = maybeVar === "auto"
    ? page?.product.image?.length && page?.product.image?.length < 2
      ? "front-back"
      : "slider"
    : maybeVar;

  return (
    <div class="container max-w-[1180px] py-0 sm:py-10">
      {page ? <Details page={page} variant={variant} /> : <NotFound />}
    </div>
  );
}

export default ProductDetails;
