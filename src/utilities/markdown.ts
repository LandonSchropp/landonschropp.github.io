import highlightJs from "highlight.js/lib/common";
import createMarkdownIt from "markdown-it";
import * as R from "remeda";

const markdownIt = createMarkdownIt({
  highlight: (code, language) => {
    return highlightJs.highlight(code, { language }).value;
  },
});

/**
 * Converts markdown to html.
 */
function convertMarkdownToHtml(markdown: string) {
  return markdownIt.render(markdown);
}

/**
 * Converts markdown to HTML, applying a variety of fixes along the way.
 */
export function markdownToHtml(markdown: string) {
  return R.pipe(markdown, convertMarkdownToHtml);
}
