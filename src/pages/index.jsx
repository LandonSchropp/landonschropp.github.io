import React from "react";

import flannel from "../images/flannel.png";
import Landscape from "../images/landing/landscape.svg";
import Portrait from "../images/landing/portrait.svg";
import { Layout } from "../layout/layout";

export default function IndexPage() {
  return <Layout navigation={ false }>
    <Landscape />
  </Layout>;
}
