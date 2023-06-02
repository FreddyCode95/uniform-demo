import React from 'react';
import { Hits } from 'react-instantsearch-hooks-web';
import { ComponentInstance } from '@uniformdev/canvas';
import Hit from "@/components/algolia/HitComponents/Hit";
import {ComponentProps, registerUniformComponent} from "@uniformdev/canvas-react";

// enum HitTypes {
//   Hit = 'algolia-hit'
// }

type HitsProps = ComponentProps<{
    column: number;
}>;

export const renderHits: React.FC<HitsProps> = ({ column }:HitsProps) => {

  // const hitType = component?.slots?.hitComponent?.[0]?.type;

  // console.log("hitType",hitType)
  // switch (hitType) {
  //   case HitTypes.Hit:
    return (
        <div className="hits">
            <div className={`container-column${column}`}>
                <p>{column}</p>
                <Hits hitComponent={Hit} />
            </div>
        </div>
    )
    // default:
    //   return <Hits />;
  // }
};

registerUniformComponent({
  type: "algolia-hits",
  component: renderHits,
});
