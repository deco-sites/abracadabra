import type { PropertyValue } from "deco-sites/std/commerce/types.ts";
import { ClusterProps } from "../search/SearchResult.tsx";

import classnames from "$classnames/index.ts";

interface Props {
  cluster?: ClusterProps[];
  additionalProperty?: PropertyValue[];
  class?: string;
}

interface BadgeProps {
  text: string;
  bgColor?: string;
  textColor?: string;
  class?: string;
}

export const ClusterBadge = (
  { text, bgColor, textColor, class: classDiv }: BadgeProps,
) => {
  return (
    <div
      class={classnames(
        "flex",
        "sm:inline-flex",
        "items-center",
        "rounded",
        "text-xs",
        classDiv,
      )}
      style={classnames(
        bgColor ? `background-color: ${bgColor};` : "",
        textColor ? `color: ${textColor};` : "",
      )}
    >
      {text}
    </div>
  );
};

const Clusters = ({ cluster, additionalProperty, class: classDiv }: Props) => {
  //   console.log(cluster);
  //   console.log(cluster.filter((c) => {
  //     return additionalProperty?.find((aP) => {
  //       return aP
  //         ? (aP["propertyID"] === c.id && aP["@type"] == "PropertyValue" &&
  //           aP.name == "cluster")
  //         : false;
  //     });
  //   }));

  if (!cluster) return null;

  return (
    <>
      {cluster.filter((c) => {
        return additionalProperty?.find((aP) => {
          return aP
            ? (aP["propertyID"] === c.id && aP["@type"] == "PropertyValue" &&
              aP.name == "cluster")
            : false;
        });
      }).map((c) => {
        return c.flags.map((cFlags) => {
          return (
            <ClusterBadge
              text={cFlags.text}
              bgColor={cFlags.backgroundColor}
              textColor={cFlags.textColor}
              class={classDiv}
            />
          );
        });
      })}
    </>
  );
};

export default Clusters;
