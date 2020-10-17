import { graphql, useStaticQuery } from "gatsby";
import React from 'react';
import Song from '../templates/Song'
import { getLyricsAndAnnotations } from "../utils/getLyricsAndAnnotations";

const QUERY = graphql`
{
  allMarkdownRemark(filter: {frontmatter: {id: {eq: "trade-your-soul"}}}) {
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

const TradeYourSoul = () => {
  const queryResult = useStaticQuery(QUERY);
  const { lyrics, annotations } = getLyricsAndAnnotations(queryResult);
  
  return <Song
    title={lyrics.frontmatter.title}
    lyrics={lyrics}
    annotations={annotations}
  />
}

export default TradeYourSoul;

