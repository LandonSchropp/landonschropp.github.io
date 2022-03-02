const path = require(`path`);

exports.createNotePages = async (graphql, createPage) => {

  // Query the data used to generate the page.
  let result = await graphql(`
     query NoteSlugs {
       notes {
         slug
       }
     }
  `);

  // Throw any generated errors.
  if (result.errors) {
    throw result.errors;
  }

  // Create the note pages.
  result.data.notes.forEach(({ slug }) => {
    createPage({
      path: `notes/${ slug }`,
      component: path.resolve(`src/templates/note-template.jsx`),
      context: { slug }
    });
  });
};
