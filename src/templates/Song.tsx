import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react"

import Layout from "../components/layout/layout"
import Lyrics from "../components/lyrics/lyrics";
import Player from "../components/player/player";
import SEO from "../components/seo/seo"
import { getLyricsAndAnnotations } from '../utils/getLyricsAndAnnotations'

const badFaithPng = require("../images/bad-faith.png");

const Song = (props) => {
  console.log(props);
  const { lyrics, annotations } = getLyricsAndAnnotations(props.data);
  const { title } = lyrics.frontmatter;

  return (
    <Layout>
      <SEO title={title} />
      <img src={badFaithPng}/>
      <Player 
        title={title}/>
      <Lyrics
        title={title}
        lyrics={lyrics}
        annotations={annotations}
      />

      <br/>
      <Link to="/">← Back to all songs</Link>
    </Layout>
  )
}

export default Song;

export const pageQuery = graphql`
  query GetSongById($id: String!) {
    allMarkdownRemark(filter: {frontmatter: { id: { eq: $id }}}) {
      edges {
        node {
          frontmatter {
            id
            type
            title
          }
          html
        }
      }
    }
  }
`