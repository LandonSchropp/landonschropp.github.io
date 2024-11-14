import { assertContent, Content } from "@/schema";
import { parseFrontmatter } from "@/utilities/frontmatter";
import { readFile } from "fs/promises";
import { glob } from "glob";
import { basename, join, relative } from "path";

/**
 * Fetches the content of a file and parses it.
 * @param contentPath The directory containing the content files.
 * @param filePath The path to the file to fetch.
 */
async function fetchAndParseContent(contentPath: string, filePath: string): Promise<Content> {
  const relativePath = relative(contentPath, filePath);
  const fileContent = await readFile(filePath, "utf8");
  const pathParts = relativePath.split("/");

  const [frontMatter, markdown] = parseFrontmatter(fileContent);
  const title = basename(filePath, ".md");

  const content = {
    ...frontMatter,
    markdown: markdown.trim(),
    category: pathParts.length > 1 ? pathParts[0] : undefined,
    title,
  };

  try {
    assertContent(content);
  } catch (error) {
    console.error(`Error parsing content from file '${filePath}'.`);
    throw error;
  }

  return content;
}

/**
 * Fetches all of the contents from the local Obsidian vault in the vault's relative path.
 * @param path The path from which the content files should be fetched.
 * @returns An array of contents.
 */
export async function fetchContents(path: string): Promise<Content[]> {
  const files = await glob(join(path, "**/*.md"));

  return Promise.all(
    files.map((filePath) => {
      return fetchAndParseContent(path, filePath);
    }),
  );
}

/**
 * Fetches a single content based on its slug.
 * @param slug The slug of the note.
 * @param path The path from which the content files should be fetched.
 * @returns The content with the provided slug.
 * @throws An error if the content could not be fetched.
 */
export async function fetchContent(path: string, slug: string): Promise<Content> {
  const content = (await fetchContents(path)).find((content) => content.slug === slug);

  if (!content) {
    throw new Error(`Content with slug '${slug}' not found.`);
  }

  return content;
}
