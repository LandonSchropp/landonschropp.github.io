const voca = require('voca');

const baseURL = require('./source/eleventy/base-url');
const listify = require('./source/eleventy/listify');
const validateNote = require('./source/eleventy/validate-note')
const inspect = require('./source/eleventy/inspect');
const includeLandingPageSVG = require('./source/eleventy/include-landing-page-svg');
const addNunjucksPromiseTag = require('./source/eleventy/add-nunjucks-promise-tag');

// TODO: Figure out how to move the root pages into a separate `pages` directory.
module.exports = function(eleventyConfig) {

  eleventyConfig.addLayoutAlias("default", "layouts/layout.njk");
  eleventyConfig.addLayoutAlias("note", "layouts/note.njk");

  eleventyConfig.addFilter("titleCase", voca.titleCase);
  eleventyConfig.addFilter("listify", listify);
  eleventyConfig.addFilter("baseURL", baseURL);

  eleventyConfig.addShortcode("inspect", inspect);

  addNunjucksPromiseTag(eleventyConfig, "includeLandingPageSVG", includeLandingPageSVG);

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
