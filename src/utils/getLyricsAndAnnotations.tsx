
export function getLyricsAndAnnotations (queryResult) {
  const { allMarkdownRemark: { edges }} = queryResult;
  const all = edges.map((e) => e.node);
  const lyrics = all.find((a) => a.frontmatter.type === 'lyrics');
  const annotations = all.filter((a) => a.frontmatter.type !== 'lyrics')
  return { lyrics, annotations };
}
