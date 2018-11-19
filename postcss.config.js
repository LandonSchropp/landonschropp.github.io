const autoprefixer = require('autoprefixer');
const postcssEasyImport = require('postcss-easy-import');

module.exports = {
  plugins: [
    autoprefixer('last 2 versions'),
    postcssEasyImport
  ]
};
