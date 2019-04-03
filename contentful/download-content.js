import _ from 'lodash';
import fs from 'fs-extra';
import path from 'path';
import { createClient } from 'contentful';

import transformContentfulEntry from './transform-contentful-entry';

const DATA_DIRECTORY = path.join(__dirname, '../data');

function enviromentVariable(name) {
  if (!_.has(process.env, name)) {
    throw new Error(`The environment variable $${ name } is not defined.`);
  }

  return process.env[name];
}

let client = createClient({
  space: enviromentVariable('CONTENTFUL_SPACE_ID'),
  accessToken: enviromentVariable('CONTENTFUL_ACCESS_TOKEN')
});

(async () => {
  let entries = _.sortBy((await client.getEntries()).items.map(transformContentfulEntry), "date");

  // Write the data to the file.
  await fs.mkdirp(path.join(__dirname, '../data'));
  await fs.writeJSON(path.join(DATA_DIRECTORY, 'notes.json'), entries, { spaces: 2 });

  // TODO: In order to keep things simple, I'm also generating the environment file. This should be
  // moved somewhere else later.
  let env = _.pick(process.env, [ "NODE_ENV" ]);
  await fs.writeJSON(path.join(DATA_DIRECTORY, 'env.json'), env, { spaces: 2 });
})();
