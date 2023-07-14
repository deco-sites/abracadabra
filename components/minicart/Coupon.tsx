import { useRef } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { useCart } from "deco-sites/std/packs/vtex/hooks/useCart.ts";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";

function Coupon() {
  const { cart, loading, addCouponsToCart } = useCart();
  const ref = useRef<HTMLInputElement>(null);
  const displayInput = useSignal(true);
  const coupon = cart.value?.marketingData?.coupon;

  const applyCouponToCart = (e: MouseEvent) => {
    e.preventDefault();

    const text = ref.current?.value;

    if (typeof text === "string") {
      addCouponsToCart({ text });
    }
  };

  const handleRemoveCoupon = (e: MouseEvent) => {
    e.preventDefault();

    addCouponsToCart({ text: "" });
  };

  return (
    <div class="flex justify-between items-center px-4 w-full">
      {displayInput.value && (
        <form class="flex items-center justify-center gap-2 w-full h-full">
          <div class="flex items-center justify-center gap-3 w-full h-full border border-silver rounded p-2 font-caption">
            <Icon
              id="Discount"
              width={20}
              height={20}
              class={coupon ? "text-red-base" : "text-[#ccc]"}
              strokeWidth={2}
            />
            <input
              id="coupon"
              name="coupon"
              ref={ref}
              class={`${
                coupon && "text-red-base font-bold"
              } flex-1 focus:outline-none`}
              type="text"
              value={coupon ?? ""}
              placeholder={"Adicionar cupom"}
            />
          </div>
          {!coupon
            ? (
              <Button
                type="submit"
                htmlFor="coupon"
                loading={loading.value}
                onClick={applyCouponToCart}
              >
                Adicionar
              </Button>
            )
            : (
              <Button
                class="bg-silver hover:bg-dark-gray text-white border-transparent hover:border-transparent"
                loading={loading.value}
                onClick={handleRemoveCoupon}
              >
                X
              </Button>
            )}
        </form>
      )}
    </div>
  );
}

export default Coupon;
