if (!process.env.NODE_ENV) {
  process.stderr.write("You must provide a $NODE_ENV environment variable.\n");
  process.exit(1);
}

module.exports = {
  NODE_ENV: process.env.NODE_ENV
};
