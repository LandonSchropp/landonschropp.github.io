import _ from 'lodash';
import fs from 'fs';
import glob from 'glob';
import yaml from 'js-yaml';

const YAML_REGEX = /^---(.*)?---/ms;

function extractFileData(source, content) {
  let pathMatch = source.match(/([^/]+)\/(\d{4}-\d{2}-\d{2})-(.*)\.md/);
  let frontMatterMatch = content.match(YAML_REGEX);

  if (_.isNil(pathMatch)) {
    throw new Error(`The file ${ source } must be in the following format: YYYY-MM-DD-<slug>.md.`);
  }

  if (_.isNil(frontMatterMatch)) {
    throw new Error(`The file ${ source } did not contain properly formatted YAML front matter.`);
  }

  return {
    ...yaml.safeLoad(frontMatterMatch[1]),
    date: new Date(pathMatch[2]),
    path: `/${ pathMatch[1] }/${ pathMatch[3] }`
  };
}

function filePathToFileData(source) {
  let content = fs.readFileSync(source, 'utf8');

  let data = extractFileData(source, content);

  return data;
}

/**
 * Given a source glob path, this function return an array of objects representing the files and
 * their content.
 *
 * HACK: This function is a stop-gap soultion for providing a source for my blog posts. Eventually,
 * when the Ghost V2 API is released, all of my blog's data can be moved to the external server. In
 * the meantime, these functions will allow me to achieve a similar effect while still allowing me
 * to move forward with development.
 */
export default function blogPosts(source) {
  return glob.sync(source).map(filePathToFileData);
}

console.log(blogPosts('source/html/notes/*'));
