import { useStaticQuery } from "gatsby";
import React from "react"

import Layout from "../components/layout/layout"
import Lyrics from "../components/lyrics/lyrics";
import Player from "../components/player/player";
import SEO from "../components/seo/seo"

const badFaithPng = require("../images/bad-faith.png");

const Song = ({
  title,
  lyrics,
  annotations
}) => {

  console.log(title)

  return (
    <Layout>
      <SEO title={title} />
      <img src={badFaithPng}/>
      <Player title={title}/>
      <Lyrics
        title={title}
        lyrics={lyrics}
        annotations={annotations}
      />
    </Layout>
  )
}

export default Song;
