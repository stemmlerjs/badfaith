import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import "./lyrics.sass"

const QUERY = graphql`
{
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          type
        }
        html
      }
    }
  }
}
`

const Lyrics = () => {
  const { allMarkdownRemark: { edges }} = useStaticQuery(QUERY);
  const all = edges.map((e) => e.node);
  const lyrics = all.find((a) => a.frontmatter.type === 'lyrics');
  console.log(lyrics);
  return (
    <section className="lyrics">
      <div dangerouslySetInnerHTML={{__html: lyrics.html}}></div>
    </section>
  )
}

export default Lyrics;