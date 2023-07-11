interface Props {
  price: number;
  listPrice: number;
}

const Discount = ({ price, listPrice }: Props) => {
  const discountValue = Math.floor(listPrice - price);

  if (discountValue === 0) return null;

  const discountPercentage = Math.floor(discountValue * 100 / listPrice);

  return (
    <span class="top-1 right-2 z-30 absolute flex items-center justify-center p-1.5 w-9 h-9 font-bold bg-[#F21A1A] rounded-full text-[11px] text-white">
      -{discountPercentage}%
    </span>
  );
};

export default Discount;
