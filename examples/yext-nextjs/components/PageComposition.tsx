import React, { ComponentType } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import getConfig from "next/config";
import { ComponentInstance, RootComponentInstance } from "@uniformdev/canvas";
import {
  ComponentProps,
  UniformComposition,
  DefaultNotImplementedComponent,
  UniformSlot,
} from "@uniformdev/canvas-react";
import { ToggleEmbeddedContextDevTools } from "@uniformdev/context-devtools";
import Hero from "./Hero";
import Navigation, { NavLink } from "./Navigation";
import Footer from "./Footer";
import FeaturedProduct from "./FeaturedProduct";
import ProductList from "./ProductList";

const PreviewDevPanel = dynamic(
  () => import("lib/uniform/preview/PreviewDevPanel")
);

// register your new components here
export function componentResolver(
  component: ComponentInstance
): ComponentType<ComponentProps<any>> | null {
  if (component.type == "hero") {
    return Hero;
  }
  if (component.type == "featuredProduct") {
    return FeaturedProduct;
  }
  if (component.type == "productList") {
    return ProductList;
  }
  return DefaultNotImplementedComponent;
}

export default function PageComposition({
  preview,
  composition,
  navLinks,
}: {
  preview: boolean;
  composition: RootComponentInstance;
  navLinks: Array<NavLink>;
}) {
  const [showPreviewToggle, setShowPreviewToggle] =
    React.useState<boolean>(false);
  const { serverRuntimeConfig } = getConfig();
  const { projectId, apiKey, apiHost } = serverRuntimeConfig;
  const { metaTitle } = composition.parameters || {};
  const title = metaTitle?.value as string;

  React.useEffect(() => {
    // Stackblitz does not support some crypto api inside webcontainers which are required for preview api.
    if (!window.location.host.includes(".webcontainer.io")) {
      setShowPreviewToggle(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <>
        <Navigation navLinks={navLinks} />
        <UniformComposition
          data={composition}
          resolveRenderer={componentResolver}
        >
          <UniformSlot name="content" />
        </UniformComposition>
        <ToggleEmbeddedContextDevTools
          initialSettings={{
            apiHost: apiHost,
            apiKey: apiKey,
            projectId: projectId,
          }}
        />
        <Footer />
      </>
      {showPreviewToggle && (
        <PreviewDevPanel preview={preview} compositionId={composition._id} />
      )}
    </>
  );
}
