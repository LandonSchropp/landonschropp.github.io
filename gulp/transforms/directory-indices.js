import rename from 'gulp-rename';

/**
 * Returns a transform stream that converts Vinyl file paths ending in `.html` to directories
 * containing index.html files. This allows static sites to be hosted with pretty paths. For
 * example, a source file of `/fruits/bananas.html` would produce `/fruits/bananas/index.html`,
 * which would be accessible in the browser at `/fruits/bananas`.
 */
export default () => rename(path => {
  if (path.basename === 'index' || path.basename === '') { return; }
  path.dirname += `/${ path.basename }`;
  path.basename = 'index';
});
