import createMarkdownIt from "markdown-it";
import * as R from "remeda";

const markdownIt = createMarkdownIt();

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

export function markdownToHtml(markdown: string) {
  return R.pipe(markdown, fixNewlies, fixBlockauotes, (markdown) => markdownIt.render(markdown));
}
