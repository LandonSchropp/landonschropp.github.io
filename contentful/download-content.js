import _ from 'lodash';
import fs from 'fs-extra';
import path from 'path';
import { createClient } from 'contentful';

import transformContentfulEntry from './transform-contentful-entry';

const DATA_DIRECTORY = path.join(__dirname, '../data');

function env(name) {
  if (!_.has(process.env, name)) {
    throw new Error(`The environment variable $${ name } is not defined.`);
  }

  return process.env[name];
}

let client = createClient({
  space: env('CONTENTFUL_SPACE_ID'),
  accessToken: env('CONTENTFUL_ACCESS_TOKEN')
});

(async () => {
  let entries = (await client.getEntries()).items.map(transformContentfulEntry);

  await fs.mkdirp(path.join(__dirname, '../data'));
  await fs.writeJSON(path.join(DATA_DIRECTORY, 'notes.json'), entries, { spaces: 2 });
})();
