import { formatPrice } from "$store/sdk/format.ts";
import Icon from "$store/components/ui/Icon.tsx";

interface Props {
  price: number;
  listPrice: number;
  currencySimbol: string;
}

const Discount = ({ price, listPrice, currencySimbol }: Props) => {
  const discountValue = Math.floor(listPrice - price);

  if (discountValue === 0) return null;

  const discountPercentage = Math.floor(discountValue * 100 / listPrice);

  return (
    <div>
      <span class="inline-flex flex-wrap justify-center items-center gap-1 h-4 px-1 bg-[#F21A1A] rounded-[3px] text-[11px] text-white">
        <Icon
          id="DiscountCaret"
          width={6}
          height={9}
          class="inline-flex text-white"
        />{" "}
        -{discountPercentage}%
      </span>
      <span class="text-[#F21A1A] text-[10px] ml-[6px]">
        Economize {formatPrice(discountValue, currencySimbol)}
      </span>
    </div>
  );
};

export default Discount;
