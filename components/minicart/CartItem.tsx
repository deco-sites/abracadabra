import Image from "deco-sites/std/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import { useCart } from "deco-sites/std/packs/vtex/hooks/useCart.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { AnalyticsEvent } from "deco-sites/std/commerce/types.ts";
import { sendEvent } from "$store/sdk/analytics.tsx";

declare global {
  interface Window {
    DECO_SITES_STD: {
      sendAnalyticsEvent: (args: AnalyticsEvent) => void;
    };
  }
}

interface Props {
  index: number;
}

function CartItem({ index }: Props) {
  const { loading, cart, updateItems, mapItemsToAnalyticsItems } = useCart();
  const item = cart.value!.items[index];
  const locale = cart.value?.clientPreferencesData.locale;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const {
    imageUrl,
    skuName,
    sellingPrice,
    listPrice,
    name,
    quantity,
  } = item;

  const isGift = sellingPrice < 0.01;

  return (
    <div class="flex flex-row justify-between items-start gap-4">
      <Image
        src={imageUrl}
        alt={skuName}
        width={100}
        height={100}
        class="object-cover object-center"
      />
      <div class="flex-grow">
        <div class="flex items-center justify-between w-full">
          <span>{name}</span>
          <Button
            onClick={() => {
              updateItems({ orderItems: [{ index, quantity: 0 }] });
              if (!cart.value) return;
              sendEvent({
                name: "remove_from_cart",
                params: {
                  items: mapItemsToAnalyticsItems({
                    items: [item],
                    marketingData: cart.value.marketingData,
                  }),
                },
              });
            }}
            disabled={loading.value || isGift}
            loading={loading.value}
            class="btn btn-ghost"
          >
            <Icon id="Trash" width={20} height={20} />
          </Button>
        </div>

        <div class="flex items-center justify-between mt-6 w-full pr-3">
          <QuantitySelector
            disabled={loading.value || isGift}
            quantity={quantity}
            onChange={(quantity) => {
              updateItems({ orderItems: [{ index, quantity }] });
              const quantityDiff = quantity - item.quantity;

              if (!cart.value) return;

              sendEvent({
                name: quantityDiff < 0 ? "remove_from_cart" : "add_to_cart",
                params: {
                  items: mapItemsToAnalyticsItems({
                    items: [{
                      ...item,
                      quantity: Math.abs(quantityDiff),
                    }],
                    marketingData: cart.value.marketingData,
                  }),
                },
              });
            }}
          />

          <span class="text-sm font-bold">
            {isGift
              ? "Grátis"
              : formatPrice(sellingPrice / 100, currencyCode!, locale)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
