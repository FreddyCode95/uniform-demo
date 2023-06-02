import React from 'react';
import AlgoliaInstantSearch from "@/components/algolia/AlgoliaInstantSearch";
import {Highlight} from "react-instantsearch-hooks-web";
import {ComponentProps} from "@uniformdev/canvas-react";
import {BaseHit} from "instantsearch.js";

type HitComponent = {
  objectID: string;
  brand: string;
  image: string;
  description: string;
  price: string;
  [name: string]: any;
};

const Hitt = ({ hit }: { hit: HitComponent }) => {
  const { objectID = 'unknown', brand, image, description, price, ...properties } = hit || {};

  console.log(properties)
  return (
        // <div className={`card${column}`}>
        <div className={`card`}>
            <img src={image} alt="name" style={{ }} />
                <div className="card-container">
                    <h3>{objectID}</h3>
                    <h1>
                        <Highlight attribute="brand" hit={hit} /> {/* this should not give an error and it works*/}
                    </h1>
                    <h3>{brand}</h3>
                    <p>{description}</p>
                    <h6>{price}</h6>
                </div>
            {/*<p style={{ wordBreak: 'break-all' }}>{JSON.stringify(properties)}</p>*/}
        </div>

  );
};

export default Hitt;