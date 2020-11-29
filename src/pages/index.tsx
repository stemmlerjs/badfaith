import { graphql, Link, useStaticQuery } from "gatsby";
import React from 'react';
import Layout from "../components/layout/layout";
import SEO from "../components/seo/seo";

const badFaithPng = require("../images/bad-faith.png");

const ALL_SONGS_QUERY = graphql`
  query GetAllSongs {
    allMarkdownRemark(filter: {frontmatter: {type: {eq: "lyrics"}}}) {
      edges {
        node {
          frontmatter {
            id
            title
            track
          }
        }
      }
    }
  }
`

const Index = () => {
  const queryResult = useStaticQuery(ALL_SONGS_QUERY);
  const songs = queryResult.allMarkdownRemark.edges.map((edge) => ({ ...edge.node }));
  
  return (
    <Layout>
      <SEO title={`Bad Faith, a ${songs.length}-track EP`} />
      <img src={badFaithPng}/>
      <blockquote className="album-description">This is a {songs.length}-track <i>in-progress</i> goth-pop EP about 
      Existentialism and Absurdism. It is influenced by ideas from Jean-Paul Sartre, Albert Camus, and the <a href="https://en.wikipedia.org/wiki/Hypnagogic_pop">hypnagogic recording styles</a> popularized 
      by Ariel Pink and John Maus.</blockquote>

      <div className="tracklist">
      {songs
        .sort((a, b) => a.frontmatter.track - b.frontmatter.track)
        .map((song, i) => (
        <h2>{i + 1}. <Link key={i} to={song.frontmatter.id}>{song.frontmatter.title}</Link></h2>
      ))}
      </div>
    </Layout>
  )
}

export default Index;

