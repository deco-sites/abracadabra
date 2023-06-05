import { Product } from "deco-sites/std/commerce/types.ts";

import ProductCard from "./ProductCard.tsx";
import { ClusterProps } from "../search/SearchResult.tsx";

export interface Columns {
  mobile?: number;
  desktop?: number;
}

export interface Props {
  products: Product[] | null;
  columns: Columns;
  clusterIdExclusiveFlag?: ClusterProps;
  cluster?: ClusterProps[];
}

function ProductGallery(
  { products, columns, clusterIdExclusiveFlag, cluster }: Props,
) {
  const columnsClass = {
    desktop: "sm:grid-cols-3",
    mobile: "grid-cols-2",
  };

  if (columns) {
    if (columns.desktop) {
      columnsClass.desktop = `sm:grid-cols-${columns.desktop}`;
    }
    if (columns.mobile) {
      columnsClass.mobile = `grid-cols-${columns.mobile}`;
    }
  }

  return (
    <div
      class={`grid auto-rows-fr items-center gap-2 sm:pl-8 sm:gap-3 ${columnsClass.mobile} ${columnsClass.desktop}`}
    >
      {products?.map((product, index) => (
        <ProductCard
          product={product}
          clusterIdExclusiveFlag={clusterIdExclusiveFlag}
          cluster={cluster}
          preload={index === 0}
        />
      ))}
    </div>
  );
}

export default ProductGallery;
