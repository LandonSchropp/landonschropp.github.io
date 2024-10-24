import { parse } from "yaml";

const FRONTMATTER_REGEX = /^---\n([\s\S]*?)\n---/;

/**
 * Parses the frontmatter from a file.
 * @param content The content of the file to parse.
 * @returns An tuple containing the frontmatter as an object and the remaining content as a string.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseFrontmatter(content: string): [Record<string, any>, string] {
  const match = content.match(FRONTMATTER_REGEX);

  if (!match) return [{}, content];

  const parsedFrontmatter = parse(match[1]);

  if (typeof parsedFrontmatter !== "object" || parsedFrontmatter === null) {
    throw new Error(`The frontmatter must be an object.\n\n${match[1]}`);
  }

  return [parsedFrontmatter, content.slice(match[0].length)];
}
