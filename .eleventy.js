// TODO: Figure out how to move the root pages into a separate `pages` directory.
module.exports = function(eleventyConfig) {

  return {
    dir: {
      input: "source",
      output: "build",
      includes: "includes"
    },
  };
};
