import Button from "$store/components/ui/Button.tsx";
import {
  Options as UseAddToCartProps,
  useAddToCart,
} from "$store/sdk/useAddToCart.ts";

interface Props extends UseAddToCartProps {
  /**
   * @description Product id
   */
  text?: string;
  sellerId: string;
}

function AddToCartButton(
  {
    text = "Adicionar à Sacola",
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
  }: Props,
) {
  const props = useAddToCart({
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
  });

  return (
    <Button data-deco="add-to-cart" {...props} class="w-full">
      {text}
    </Button>
  );
}

export default AddToCartButton;
