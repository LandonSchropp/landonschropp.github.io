import { Content } from "@/types";
import { getMarkdownImageSourcePaths } from "@/utilities/markdown";
import { readFile } from "fs/promises";
import { join, dirname } from "path";

/**
 * Downloads the image relative to the provided content.
 * @param content The content to which the image belongs.
 * @param image The image to download.
 * @returns A Response that contains the image.
 */
export async function downloadImage(content: Content, image: string): Promise<Response> {
  const path = join(dirname(content.filePath), image);

  // Read the image file
  // TODO: Figure out if the file can be streamed to avoid loading it into memory first.
  const buffer = await readFile(path);

  // Create the response and set the appropriate headers for the image
  return new Response(buffer, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
    },
  });
}

/**
 * Given an array of contents, this method returns object pairs of the content slugs and images
 * contained in the contents.
 * @param contents The contents to search.
 * @returns An array of objects containing the slug and image for each image contained the contents.
 */
export function getContentImageSlugPairs(contents: Content[]): { slug: string; image: string }[] {
  return contents.flatMap(({ slug, markdown }) => {
    return getMarkdownImageSourcePaths(markdown).map((image) => ({ slug, image }));
  });
}
