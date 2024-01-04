import highlightJs from "highlight.js/lib/common";
import createMarkdownIt from "markdown-it";
import * as R from "remeda";

const markdownIt = createMarkdownIt({
  highlight: (code, language) => {
    return highlightJs.highlight(code, { language }).value;
  },
});

function fixNewlies(markdown: string) {
  return markdown.replaceAll(/\n[\n]+/g, "\n\n");
}

/**
 * This fixes a bug in markdownToHtml where blockquotes are not properly formatted.
 */
function fixBlockauotes(markdown: string) {
  return markdown.replaceAll(/>[\s\S]+?(?=(\n\w|$))/g, (match) => {
    return (
      match
        .replaceAll("\t", "> ")
        .trim()
        .replaceAll(/\n(?=\n)/g, "\n>") + "\n\n"
    );
  });
}

/**
 * If the markdown string contains h1s, convert them down a level.
 */
function normalizeHeaders(markdown: string): string {
  // Don't transform the markdown unless it contains an h1.
  if (!/(?<=\n|^)#\s+\S/.test(markdown)) {
    return markdown;
  }

  // Drop all of the headers down a level.
  return markdown.replaceAll(/(?<=\n|^)#+(?=\s\S)/g, (match) => `${match}#`);
}

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
  return R.pipe(markdown, fixNewlies, fixBlockauotes, normalizeHeaders, convertMarkdownToHtml);
}
