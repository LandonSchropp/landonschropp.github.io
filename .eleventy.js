const voca = require('voca');

const baseURL = require('./source/utilities/base-url');
const embedly = require('./source/utilities/embedly');
const listify = require('./source/utilities/listify');
const validateNote = require('./source/utilities/validate-note')

// TODO: Figure out how to move the root pages into a separate `pages` directory.
module.exports = function(eleventyConfig) {

  eleventyConfig.addLayoutAlias("default", "layouts/layout.njk");
  eleventyConfig.addLayoutAlias("note", "layouts/note.njk");

  eleventyConfig.addNunjucksTag("embedly", embedly);

  eleventyConfig.addFilter("titleCase", voca.titleCase);
  eleventyConfig.addFilter("listify", listify);
  eleventyConfig.addFilter("baseURL", baseURL);

  eleventyConfig.addCollection("notes", (collection) => {

    // Grab all of the notes
    let notes = collection.getFilteredByGlob("source/notes/**/*");

    // Validate all of the notes to make sure I didn't accidentally leave something out.
    notes.forEach(validateNote);

    // Return the notes
    return notes;
  });

  return {
    dir: {
      input: "source",
      output: "build",
      includes: "includes"
    },
  };
};
