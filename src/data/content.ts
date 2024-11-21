import { parseFrontmatter } from "@/utilities/frontmatter";
import { readFile } from "fs/promises";
import { glob } from "glob";
import { basename, join, relative } from "path";

type ParsedContent = Record<string, any>;

function compareDateStrings(first: unknown, second: unknown): number {
  if (typeof first !== "string") {
    return -1;
  }

  if (typeof second !== "string") {
    return 1;
  }

  return first.localeCompare(second);
}

/**
 * Fetches the content of a file and parses it.
 * @param contentPath The directory containing the content files.
 * @param filePath The path to the file to fetch.
 */
async function fetchAndParseContent(contentPath: string, filePath: string): Promise<ParsedContent> {
  const relativePath = relative(contentPath, filePath);
  const fileContent = await readFile(filePath, "utf8");
  const pathParts = relativePath.split("/");

  let frontMatter: ReturnType<typeof parseFrontmatter>[0];
  let markdown: ReturnType<typeof parseFrontmatter>[1];

  try {
    [frontMatter, markdown] = parseFrontmatter(fileContent);
  } catch (error) {
    console.error(`Error parsing frontmatter from file '${filePath}'.`);
    throw error;
  }

  const title = basename(filePath, ".md");

  return {
    ...frontMatter,
    markdown: markdown.trim(),
    category: pathParts.length > 1 ? pathParts[0] : undefined,
    title,
  };
}

/**
 * Fetches all of the contents from the local Obsidian vault in the vault's relative path.
 * @param path The path from which the content files should be fetched.
 * @returns An array of contents.
 */
export async function fetchContents(path: string): Promise<ParsedContent[]> {
  // Find all of the markdown files in the provided path.
  const files = await glob(join(path, "**/*.md"));

  // Fetch and parse all of the contents in the given directory.
  let contents = await Promise.all(
    files.map((filePath) => {
      return fetchAndParseContent(path, filePath);
    }),
  );

  // Filter out unpublished content
  contents = contents.filter((content) => {
    return "published" in content && typeof content.published === "boolean" && content.published;
  });

  // Sort the contents by date (if present). This is a bit tricky, because we haven't actually
  // parsed the dates yet. However, we can still rely on a sorting the date strings.
  return contents.toSorted(compareDateStrings);
}

/**
 * Fetches a single content based on its slug.
 * @param slug The slug of the note.
 * @param path The path from which the content files should be fetched.
 * @returns The content with the provided slug.
 * @throws An error if the content could not be fetched.
 */
export async function fetchContent(path: string, slug: string): Promise<ParsedContent> {
  const content = (await fetchContents(path)).find((content) => content.slug === slug);

  if (!content) {
    throw new Error(`Content with slug '${slug}' not found.`);
  }

  return content;
}
