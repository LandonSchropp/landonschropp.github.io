import multipipe from 'multipipe';
import data from 'gulp-data';
import frontMatter from 'gulp-front-matter';
import rename from 'gulp-rename';

/**
 * This returns a transform for blog post metadata. It does a few things:
 *
 * * Extracts the front matter data from each blog post.
 * * Extracts the slug from each post's file name.
 * * Extracts the data from each post's file name.
 * * Renames the file to match the slug.
 * * Adds a link property to each file's data.
 *
 * In order to work properly, this transform makes a few assumptions:
 *
 * * The files are in Markdown format.
 * * The files contain front matter data for the metadata in the file.
 * * The file name matches this format: YYYY-MM-DD-<slug>.md
 */
export default function blogPostMetadata() {
  return multipipe(
    frontMatter({ property: 'data', remove: true }),
    data(file => ({
      ...file.data,
      date: new Date(file.path.match(/(\d{4}-\d{2}-\d{2})/)[1])
    })),
    rename(path => path.basename = path.basename.replace(/(\d{4}-\d{2}-\d{2})-/, ''))
  );
}
