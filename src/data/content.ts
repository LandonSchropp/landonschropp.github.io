import { parseFrontmatter } from "@/utilities/frontmatter";
import { prefixMarkdownImageSourcePaths } from "@/utilities/markdown";
import { readFile } from "fs/promises";
import { glob } from "glob";
import { basename, join, relative } from "path";

/** An object containing the raw metadata and markdown of a parsed content file. */
export type Content = Record<string, unknown>;

/**
 * Fetches the content of a file and parses it.
 * @param contentPath The directory containing the content files.
 * @param filePath The path to the file to fetch.
 */
async function fetchAndParseContent(contentPath: string, filePath: string): Promise<Content> {
  const relativePath = relative(contentPath, filePath);
  const fileContent = await readFile(filePath, "utf8");
  const pathParts = relativePath.split("/");

  const [frontMatter, markdown] = parseFrontmatter(filePath, fileContent);

  return {
    ...frontMatter,
    markdown: prefixMarkdownImageSourcePaths(markdown, frontMatter.slug ?? null).trim(),
    category: pathParts.length > 1 ? pathParts[0] : frontMatter.category,
    title: "title" in frontMatter ? frontMatter.title : basename(filePath, ".md"),
  };
}

/**
 * Fetches all of the content files.
 * @param path The path from which the content files should be fetched.
 * @returns An array of contents.
 */
export async function fetchContents(path: string): Promise<Content[]> {
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
  return contents.toSorted((first, second) => {
    // If the date property is not present, the content will fail validation down the line so the
    // sorting doesn't matter.
    if (
      !("date" in first) ||
      !("date" in second) ||
      typeof first.date !== "string" ||
      typeof second.date !== "string"
    ) {
      return 0;
    }

    // Sort the dates in descending order.
    return second.date.localeCompare(first.date);
  });
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
