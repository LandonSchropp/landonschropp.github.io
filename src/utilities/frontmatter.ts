import { parse, YAMLError } from "yaml";

const FRONTMATTER_REGEX = /^---\n([\s\S]*?)\n---/;

/**
 * Parses the frontmatter from a file.
 * @param filePath The path to the file being parsed (used for error messages).
 * @param content The content of the file to parse.
 * @returns An tuple containing the frontmatter as an object and the remaining content as a string.
 */

export function parseFrontmatter(filePath: string, content: string): [Record<string, any>, string] {
  const match = content.match(FRONTMATTER_REGEX);

  if (!match) return [{}, content];

  let parsedFrontmatter: any;

  try {
    parsedFrontmatter = parse(match[1]);
  } catch (error) {
    if (error instanceof YAMLError) {
      throw new Error(`Error parsing frontmatter from file '${filePath}'.\n\n${error.message}`);
    }
  }

  if (typeof parsedFrontmatter !== "object" || parsedFrontmatter === null) {
    throw new Error(`The frontmatter must be an object.\n\n${match[1]}`);
  }

  return [parsedFrontmatter, content.slice(match[0].length)];
}
