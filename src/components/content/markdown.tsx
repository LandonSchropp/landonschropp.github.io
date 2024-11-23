import { convertMarkdownToHtml } from "@/utilities/markdown";

/**
 * A component that renders markdown as HTML.
 * @param markdown The markdown to render.
 */
export function Markdown({ markdown }: { markdown: string }) {
  return <section dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(markdown) }} />;
}
