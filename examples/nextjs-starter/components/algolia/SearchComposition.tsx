import React from "react";
import Head from "next/head";
import { RootComponentInstance } from "@uniformdev/canvas";
import {UniformComposition, registerUniformComponent, UniformSlot} from "@uniformdev/canvas-react";
import Footer from "./Footer";
import AlgoliaInstantSearch from "@/components/algolia/AlgoliaInstantSearch";

export default function SearchComposition({
  composition,
}: {
  composition: RootComponentInstance;
}) {
  const { metaTitle } = composition.parameters || {};
  const title = metaTitle?.value as string;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <>
        <div className="title">
          <p>{title}</p>
        </div>
        <UniformComposition data={composition}>
          <UniformSlot name="providers" />
        </UniformComposition>
        <Footer />
      </>
    </>
  );
}

// registerUniformComponent({
//     type: "search-composition",
//     component: AlgoliaInstantSearch,
// });
