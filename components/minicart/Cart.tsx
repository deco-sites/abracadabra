import { useCart } from "deco-sites/std/packs/vtex/hooks/useCart.ts";
import { formatPrice } from "$store/sdk/format.ts";
import Button from "$store/components/ui/Button.tsx";
import { AnalyticsEvent } from "deco-sites/std/commerce/types.ts";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import CartItem from "./CartItem.tsx";
import Coupon from "./Coupon.tsx";
import { Signal, useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import Icon from "$store/components/ui/Icon.tsx";

import type {
  SimulationOrderForm,
  SKU,
  Sla,
} from "deco-sites/std/packs/vtex/types.ts";

export interface Props {
  items: Array<SKU>;
  type?: "Cart" | "Product Page";
}

declare global {
  interface Window {
    DECO_SITES_STD: {
      sendAnalyticsEvent: (args: AnalyticsEvent) => void;
    };
  }
}

function ShippingContent({ simulation }: {
  simulation: Signal<SimulationOrderForm | null>;
}) {
  const { cart } = useCart();

  const methods = simulation.value?.logisticsInfo?.reduce(
    (initial, { slas }) => [...initial, ...slas],
    [] as Sla[],
  ) ?? [];

  const locale = cart.value?.clientPreferencesData.locale || "pt-BR";
  const currencyCode = cart.value?.storePreferencesData.currencyCode || "BRL";

  if (simulation.value == null) {
    return null;
  }

  if (methods.length === 0) {
    return (
      <div class="absolute -translate-y-10 right-[5%] py-2 px-4 text-sm min-w-min md:min-w-[360px] flex items-center justify-center border border-red-medium bg-red-light">
        <span class="text-red-dark">Por favor, informe um CEP válido</span>
      </div>
    );
  }

  return (
    <div class="flex justify-between items-center w-full">
      <span>Entrega</span>
      <span class="font-medium text-lg">
        {methods[0].price === 0 ? "Frete grátis" : (
          formatPrice(methods[0].price / 100, currencyCode, locale)
        )}
      </span>
    </div>
  );
}

function Cart() {
  const { displayCart } = useUI();
  const { cart, loading, mapItemsToAnalyticsItems, simulate } = useCart();
  const isCartEmpty = cart.value?.items.length === 0;
  const total = cart.value?.totalizers.find((item) => item.id === "Items");
  const discounts = cart.value?.totalizers.find((item) =>
    item.id === "Discounts"
  );
  const locale = cart.value?.clientPreferencesData.locale;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const postalCode = useSignal("");
  const simulateResult = useSignal<SimulationOrderForm | null>(null);
  const finalSimulateShippingPrice = useSignal<number | null>(null);

  if (cart.value === null) {
    return null;
  }

  const handleSimulation = useCallback(async () => {
    if (postalCode.value.length !== 8) {
      return;
    }

    try {
      loading.value = true;

      simulateResult.value = await simulate({
        items: cart.value?.items.map((item) => ({
          id: Number(item.id),
          quantity: item.quantity,
          seller: item.seller,
        })),
        postalCode: postalCode.value,
        country: cart.value?.storePreferencesData.countryCode || "BRA",
      });

      const methods = simulateResult.value?.logisticsInfo?.reduce(
        (initial, { slas }) => [...initial, ...slas],
        [] as Sla[],
      ) ?? [];

      finalSimulateShippingPrice.value = methods[0].price;
    } finally {
      loading.value = false;
    }
  }, [cart]);

  const handleCancelSimulation = () => {
    postalCode.value = "";
    simulateResult.value = null;
  }

  // Empty State
  if (isCartEmpty) {
    return (
      <div class="flex flex-col justify-center items-center h-full gap-6">
        <span class="font-medium text-2xl">Sua sacola está vazia</span>
        <Button
          class="btn-outline"
          onClick={() => {
            displayCart.value = false;
          }}
        >
          Escolher produtos
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Cart Items */}
      <ul
        role="list"
        class="mt-6 px-2 flex-grow overflow-y-auto flex flex-col gap-6"
      >
        {cart.value.items.map((_, index) => (
          <li>
            <CartItem index={index} key={index} />
          </li>
        ))}
      </ul>

      {/* Cart Footer */}
      <footer>
        {/* Subtotal */}
        {total?.value && (
          <div class="py-4 flex flex-col gap-4">
            <div class="flex justify-between items-center px-4">
              <span class="font-bold">Subtotal</span>
              <span class="font-medium text-lg">
                {formatPrice(total.value / 100, currencyCode!, locale)}
              </span>
            </div>
          </div>
        )}
        <div class="border-t border-base-200 py-4 flex flex-col gap-4">
          <Coupon />

          {/* ShippingSimulation */}
          <div class="flex justify-between items-center px-4 w-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSimulation();
              }}
              class="flex items-center justify-center gap-2 w-full h-full"
            >
              <div class="flex items-center justify-center gap-3 w-full h-full border border-silver rounded p-2 font-caption">
                <Icon
                  id="ShoppingCart"
                  width={20}
                  height={20}
                  class={simulateResult.value ? 'text-red-base' : 'text-[#ccc]'}
                  strokeWidth={2}
                />
                <input
                  as="input"
                  type="text"
                  class={`${simulateResult.value && 'text-red-base font-bold'} flex-1 focus:outline-none`}
                  placeholder="Seu cep aqui"
                  value={postalCode.value}
                  maxLength={8}
                  onChange={(e: { currentTarget: { value: string } }) => {
                    postalCode.value = e.currentTarget.value;
                  }}
                />
              </div>

              {!simulateResult.value ? (
                <Button
                  type="submit"
                  loading={loading.value}
                >
                  Calcular
                </Button>
              ) : (
                <Button
                  class="bg-silver hover:bg-dark-gray text-white border-transparent hover:border-transparent"
                  onClick={handleCancelSimulation}
                  loading={loading.value}
                >
                  X
                </Button>
              )}
            </form>
          </div>
        </div>
        {/* Total price */}
        {total?.value && (
          <div class="flex flex-col justify-end items-end gap-2 mx-4">
            {discounts?.value && (
              <div class="flex justify-between w-full text-red-base">
                <span class="text-lg">Descontos</span>
                <span class="text-lg">
                  {formatPrice(discounts.value / 100, currencyCode!, locale)}
                </span>
              </div>
            )}

            <ShippingContent simulation={simulateResult} />

            <div class="flex justify-between items-center w-full">
              <span class="font-bold text-lg">Total</span>
              <span class="font-bold text-lg">
                {formatPrice((total.value + (discounts?.value ?? 0) + (finalSimulateShippingPrice?.value ?? 0)) / 100, currencyCode!, locale)}
              </span>
            </div>

            <div class="flex justify-end w-full text-silver">
              ou 2x de {formatPrice(((total.value + (discounts?.value ?? 0) + (finalSimulateShippingPrice?.value ?? 0)) / 100) / 2, currencyCode!, locale)}
            </div>
          </div>
        )}
        <div class="mt-12 p-4">
          <a class="inline-block w-full" href="/checkout">
            <Button
              data-deco="buy-button"
              class="w-full bg-blue-base hover:bg-blue-hover text-white text-sm border-transparent hover:border-transparent rounded-md mt-2"
              disabled={loading.value || cart.value.items.length === 0}
              onClick={() => {
                sendEvent({
                  name: "begin_checkout",
                  params: {
                    currency: cart.value ? currencyCode! : "",
                    value: total?.value
                      ? (total?.value - (discounts?.value ?? 0)) / 100
                      : 0,
                    coupon: cart.value?.marketingData?.coupon ?? undefined,

                    items: cart.value
                      ? mapItemsToAnalyticsItems(cart.value)
                      : [],
                  },
                });
              }}
            >
              Finalizar Compra
            </Button>
          </a>
        </div>
      </footer>
    </>
  );
}

export default Cart;
