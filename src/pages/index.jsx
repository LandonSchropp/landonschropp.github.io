import React from "react"
import { Layout } from '../layout/layout';

import flannel from "../images/flannel.png"
import Portrait from "../images/landing/portrait.svg"
import Landscape from "../images/landing/landscape.svg"

export default function IndexPage() {
  return <Layout navigation={false}>
    <Landscape />
  </Layout>
}
