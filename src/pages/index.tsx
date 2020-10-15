import React from "react"

import Layout from "../components/layout/layout"
import Lyrics from "../components/lyrics/lyrics";
import Player from "../components/player/player";
import SEO from "../components/seo/seo"

const badFaithPng = require("../images/bad-faith.png");

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <img src={badFaithPng}/>
    <Player/>
    <Lyrics/>
  </Layout>
)

export default IndexPage
