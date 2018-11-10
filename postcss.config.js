const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');

module.exports = {
  plugins: [
    autoprefixer('last 2 versions'),
    postcssImport
  ]
};
