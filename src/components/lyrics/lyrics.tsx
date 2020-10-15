import { graphql, useStaticQuery } from 'gatsby'
import React, { useEffect, useState } from 'react'
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

function useAnnotations () {
  let [currentAnnotation, setCurrentAnnotation] = useState(null);

  const openAnnotation = (annotation) => {
    setCurrentAnnotation(annotation);
  }

  const closeAnnotation = () => {
    setCurrentAnnotation(null);
  }

  return {
    operations: { openAnnotation, closeAnnotation },
    models: { currentAnnotation }
  }
}

const Lyrics = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { allMarkdownRemark: { edges }} = useStaticQuery(QUERY);
  const all = edges.map((e) => e.node);
  const lyrics = all.find((a) => a.frontmatter.type === 'lyrics');
  const annotations = all.filter((a) => a.frontmatter.type !== 'lyrics')
  const { operations, models } = useAnnotations();

  const onClickOutsideListener = () => {
    operations.closeAnnotation();
    document.removeEventListener("click", onClickOutsideListener)
    turnOnScrolling();
  }

  const bindAnnotations = () => {
    annotations.forEach((a) => {
      let span = document.getElementById(a.frontmatter.type);
      span.addEventListener('click', (e) => {
        e.stopPropagation();
        operations.openAnnotation(a);
        document.addEventListener("click", onClickOutsideListener)
        turnOffScrolling();
      })
    })
  }

  const listenToScroll = () => {
    const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight

    const scrolled = winScroll + height * 0.20;

    if (!models.currentAnnotation) {
      console.log(models.currentAnnotation)
      setScrollPosition(scrolled);
    }
  }

  const turnOnScrolling = () => {
    if (typeof window !== undefined) {
      window.addEventListener('scroll', listenToScroll)
    }
  }

  const turnOffScrolling = () => {
    if (typeof window !== undefined) {
      window.removeEventListener('scroll', listenToScroll)
    }
  }
  
  useEffect(() => {
    bindAnnotations();
    turnOnScrolling();
  }, [annotations]);

  console.log(models.currentAnnotation);
  
  return (
    <section className="lyrics">
      {models.currentAnnotation ? (
        <div
          style={{ top: `${scrollPosition}px`}}
          className="annotation">
          <div dangerouslySetInnerHTML={{
            __html: models.currentAnnotation.html}}></div>
          </div>
      ) : ''}
      <div className="lyric-content" dangerouslySetInnerHTML={{__html: lyrics.html}}></div>
    </section>
  )
}

export default Lyrics;