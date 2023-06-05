import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export type AvailableIcons =
  | "ChevronLeft"
  | "ChevronRight"
  | "ChevronUp"
  | "ChevronDown"
  | "QuestionMarkCircle"
  | "User"
  | "ShoppingCart"
  | "Bars3"
  | "Heart"
  | "MagnifyingGlass"
  | "XMark"
  | "Plus"
  | "Minus"
  | "MapPin"
  | "Phone"
  | "Elo"
  | "Mastercard"
  | "Visa"
  | "Pix"
  | "Logo"
  | "Tiktok"
  | "Truck"
  | "Discount"
  | "Return"
  | "CreditCard"
  | "Deco"
  | "Discord"
  | "Trash"
  | "FilterList"
  | "ArrowsPointingOut"
  | "Search"
  | "BlogDaCa"
  | "Instagram"
  | "Facebook"
  | "Youtube"
  | "Pinterest"
  | "Spotify"
  | "WhatsApp"
  | "TruckPng"
  | "DiscountPng"
  | "InstallmentsPng"
  | "UserPng"
  | "MinicartPng"

interface Props extends JSX.SVGAttributes<SVGSVGElement> {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   *
   * Example: <Icon id="Bell" />
   */
  id: AvailableIcons;
  size?: number;
}

function Icon(
  { id, strokeWidth = 16, size, width, height, ...otherProps }: Props,
) {
  return (
    <svg
      {...otherProps}
      width={width ?? size}
      height={height ?? size}
      strokeWidth={strokeWidth}
    >
      <use href={asset(`/sprites.svg#${id}`)} />
    </svg>
  );
}

export default Icon;
