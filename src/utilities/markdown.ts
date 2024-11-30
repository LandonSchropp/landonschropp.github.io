import highlightJs from "highlight.js/lib/common";
import createMarkdownIt from "markdown-it";

/**
 * A markdown-it plugin that wraps tables in a responsive container.
 */
export default function tableWrapper(markdownit: createMarkdownIt): void {
  markdownit.renderer.rules.table_open = function () {
    return '<div class="overflow-x-auto my-4"><table>';
  };

  markdownit.renderer.rules.table_close = function () {
    return "</table></div>";
  };
}

// Create the renderer used to render the markdown
const markdownIt = createMarkdownIt({
  html: true,
  highlight: (code, language) => {
    if (language === "") {
      return code;
    }

    return highlightJs.highlight(code, { language }).value;
  },
});

// Load the custom table wrapper plugin
markdownIt.use(tableWrapper);

/**
 * Converts markdown to html.
 */
export function convertMarkdownToHtml(markdown: string) {
  return markdownIt.render(markdown);
}
