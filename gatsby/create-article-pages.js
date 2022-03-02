const path = require(`path`);

exports.createArticlePages = async (graphql, createPage) => {

  // Query the data used to generate the page.
  let result = await graphql(`
     query ArticleUrls {
       articles {
         slug
         url
       }
     }
  `);

  // Throw any generated errors.
  if (result.errors) {
    throw result.errors;
  }

  // Filter out the external articles and create pages for each.
  result.data.articles.filter(({ url }) => !url).forEach(({ slug }) => {
    createPage({
      path: `articles/${ slug }`,
      component: path.resolve(`src/templates/article-template.jsx`),
      context: { slug }
    });
  });
};
