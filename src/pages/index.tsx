import { graphql, useStaticQuery } from "gatsby";
import React from 'react';
import Song from '../templates/Song'
import { getLyricsAndAnnotations } from "../utils/getLyricsAndAnnotations";

const BAD_FAITH_QUERY = graphql`
{
  allMarkdownRemark(filter: {frontmatter: {id: {eq: "bad-faith"}}}) {
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

const Index = () => {
  const queryResult = useStaticQuery(BAD_FAITH_QUERY);
  const { lyrics, annotations } = getLyricsAndAnnotations(queryResult);
  
  return <Song
    title={lyrics.frontmatter.title}
    lyrics={lyrics}
    annotations={annotations}
  />
}

export default Index;

