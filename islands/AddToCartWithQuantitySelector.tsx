interface Props {
  sellerId: string;
  listPrice?: number;
  skuId: string;
  price: number;
  discount: number;
  productGroupId?: string;
  name: string;
}

import AddToCartButton from "./AddToCartButton.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";

import { useState } from "preact/hooks";

export default function AddToCartWithQuantitySelector({
  productGroupId,
  price,
  name,
  discount,
  skuId,
  sellerId,
}: Props) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div class="flex flex-col items-center lg:items-start gap-2">
      <QuantitySelector
        quantity={quantity}
        onChange={setQuantity}
      />

      <AddToCartButton
        skuId={skuId}
        sellerId={sellerId}
        price={price ?? 0}
        discount={discount}
        name={name ?? ""}
        quantity={quantity}
        productGroupId={productGroupId ?? ""}
      />
    </div>
  );
}
