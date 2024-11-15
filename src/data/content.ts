import { parseFrontmatter } from "@/utilities/frontmatter";
import { readFile } from "fs/promises";
import { glob } from "glob";
import { basename, join, relative } from "path";

/**
 * Fetches the content of a file and parses it.
 * @param contentPath The directory containing the content files.
 * @param filePath The path to the file to fetch.
 */
async function fetchAndParseContent(
  contentPath: string,
  filePath: string,
): Promise<Record<string, any>> {
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
export async function fetchContents(path: string): Promise<Record<string, any>[]> {
  const files = await glob(join(path, "**/*.md"));

  const contents = await Promise.all(
    files.map((filePath) => {
      return fetchAndParseContent(path, filePath);
    }),
  );

  return contents.filter((content) => {
    return "published" in content && typeof content.published === "boolean" && content.published;
  });
}

/**
 * Fetches a single content based on its slug.
 * @param slug The slug of the note.
 * @param path The path from which the content files should be fetched.
 * @returns The content with the provided slug.
 * @throws An error if the content could not be fetched.
 */
export async function fetchContent(path: string, slug: string): Promise<Record<string, any>> {
  const content = (await fetchContents(path)).find((content) => content.slug === slug);

  if (!content) {
    throw new Error(`Content with slug '${slug}' not found.`);
  }

  return content;
}
