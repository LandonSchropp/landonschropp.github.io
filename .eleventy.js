const voca = require('voca');

const addNunjucksPromiseTag = require('./source/eleventy/add-nunjucks-promise-tag');
const baseURL = require('./source/eleventy/base-url');
const includeLandingPageSVG = require('./source/eleventy/include-landing-page-svg');
const inspect = require('./source/eleventy/inspect');
const listify = require('./source/eleventy/listify');
const notesCollection = require('./source/eleventy/notes-collection');

// TODO: Figure out how to move the root pages into a separate `pages` directory.
module.exports = function(eleventyConfig) {

  eleventyConfig.addLayoutAlias("default", "layouts/layout.njk");
  eleventyConfig.addLayoutAlias("note", "layouts/note.njk");

  eleventyConfig.addFilter("titleCase", voca.titleCase);
  eleventyConfig.addFilter("listify", listify);
  eleventyConfig.addFilter("baseURL", baseURL);

  eleventyConfig.addShortcode("inspect", inspect);

  addNunjucksPromiseTag(eleventyConfig, "includeLandingPageSVG", includeLandingPageSVG);

  eleventyConfig.addCollection("notes", notesCollection);

  return {
    dir: {
      input: "source",
      output: "build",
      includes: "includes"
    },
  };
};
