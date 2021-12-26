import voca from "voca";

import addAsyncShortcode from "./extensions/add-async-shortcode";
import baseURL from "./filters/base-url";
import icon from "./shortcodes/icon";
import includeLandingPageSVG from "./shortcodes/include-landing-page-svg";
import listify from "./filters/listify";
import log from "./shortcodes/log";
import required from "./filters/required";

// TODO: Figure out how to move the root pages into a separate `pages` directory.
export default function configureEleventy(eleventyConfig) {

  // TODO: Remove this when Eleventy adds official support for promises in shortcodes.
  eleventyConfig.addAsyncShortcode = addAsyncShortcode;

  // Add the custom filters
  eleventyConfig.addFilter("titleCase", voca.titleCase);
  eleventyConfig.addFilter("trim", voca.trim);
  eleventyConfig.addFilter("listify", listify);
  eleventyConfig.addFilter("required", required);
  eleventyConfig.addFilter("baseURL", baseURL);

  // Add the custom shortcodes
  eleventyConfig.addShortcode("log", log);
  eleventyConfig.addShortcode("icon", icon);
  eleventyConfig.addAsyncShortcode("includeLandingPageSVG", includeLandingPageSVG);

  return {
    dir: {
      input: "source",
      output: "build",
      includes: "includes",
      data: "../data"
    }
  };
}
