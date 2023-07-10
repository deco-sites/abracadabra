import { formatPrice } from "$store/sdk/format.ts";

interface Props {
  price: number;
  listPrice: number;
  currencySimbol: string;
}

const Discount = ({ price, listPrice, currencySimbol }: Props) => {
  const discountValue = Math.floor(listPrice - price);

  if (discountValue === 0) return null;

  return (
    <div class="flex border border-red-medium px-4 py-[2px] rounded-md">
      <span class="flex flex-col items-center justify-center text-[#F21A1A] text-sm">
        <span>Economize</span>
        {formatPrice(discountValue, currencySimbol)}
      </span>
    </div>
  );
};

export default Discount;
