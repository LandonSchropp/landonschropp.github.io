import { useMediaQuery } from "@react-hook/media-query";
import React from "react";

import flannel from "../images/flannel.png";
import Landscape from "../images/landing/landscape.svg";
import Portrait from "../images/landing/portrait.svg";
import { Layout } from "../layout/layout";

const PORTRAIT_MEDIA_QUERY = "(max-aspect-ratio: 1 / 1)";

export default function IndexPage() {
  const isPortrait = useMediaQuery(PORTRAIT_MEDIA_QUERY);

  return <Layout navigation={ false }>
    { isPortrait ? <Portrait /> : <Landscape /> }
    <Landscape />
  </Layout>;
}
