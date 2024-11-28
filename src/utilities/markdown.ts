import highlightJs from "highlight.js/lib/common";
import createMarkdownIt from "markdown-it";

const markdownIt = createMarkdownIt({
  html: true,
  highlight: (code, language) => {
    if (language === "") {
      return code;
    }

    return highlightJs.highlight(code, { language }).value;
  },
});

/**
 * Converts markdown to html.
 */
export function convertMarkdownToHtml(markdown: string) {
  return markdownIt.render(markdown);
}
