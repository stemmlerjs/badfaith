/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

// module.exports.onCreateNode = (node, actions, getNode) => {
//   const { createNodeField } = actions

//   if (node.internal.type === `MarkdownRemark`) {
//     const value = createFilePath({ node, getNode })
//     createNodeField({
//       name: `slug`,
//       node,
//       value,
//     })
//   }
// }

const path = require('path')

module.exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  try {
    const allSongs = await graphql(`
      query {
        allMarkdownRemark(filter: {frontmatter: {type: {eq: "lyrics" }}}) {
          edges {
            node {
              id
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
    `);
    const songs = allSongs.data.allMarkdownRemark.edges;
    songs.forEach((edge) => {
      const id = edge.node.frontmatter.id;
      createPage({
        path: edge.node.frontmatter.id,
        component: path.resolve(
          `src/templates/Song.tsx`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })
    // const articleData = await getArticlesData(graphql);

    // const articles = articleData.data.allMarkdownRemark.edges



    // // Tag pages:
    // let tags = []
    // let categories = []

    // // Iterate through each post, putting all found tags into `tags`
    // articles.forEach(edge => {
    //   if (_.get(edge, `node.frontmatter.tags`)) {
    //     tags = tags.concat(edge.node.frontmatter.tags)
    //   }

    //   if (_.get(edge, `node.frontmatter.category`)) {
    //     categories.push(edge.node.frontmatter.category)
    //   }
    // })

    // // Eliminate duplicate tags
    // tags = _.uniq(tags)

    // categories = _.uniq(categories)

    // // Make tag pages
    // tags.forEach(tag => {
    //   const tagPath = `/articles/tags/${_.kebabCase(tag)}/`

    //   createPage({
    //     path: tagPath,
    //     component: path.resolve(`src/templates/tags.js`),
    //     context: {
    //       tag,
    //     },
    //   })
    // })

    // categories.forEach(category => {
    //   const categoryPath = `/articles/categories/${_.kebabCase(category)}/`

    //   createPage({
    //     path: categoryPath,
    //     component: path.resolve(`src/templates/categories.js`),
    //     context: {
    //       category,
    //     },
    //   })
    // })
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}