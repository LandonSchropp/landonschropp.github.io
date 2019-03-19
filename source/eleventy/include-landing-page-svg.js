const SVGO = require('svgo');
const fs = require('fs');

module.exports = function includeLandingPageSVG(path) {

  // Read the image from the file
  let svg = fs.readFileSync(`${ __dirname }/../images/${ path }`, 'utf8');

  // Clean up the unneeded metadata for the image
  //
  // * Remove the <?xml?> tag
  // * Remove the xmlns attributes
  // * Remove the width and height attributes
  // * Remove the version attribute
  // * Remove the stroke and fill attributes
  let svgo = new SVGO({
    plugins: [
      { removeXMLProcInst: true },
      { cleanupIDs: false },
      { removeXMLNS: true },
      { removeViewBox: false },
      { removeDimensions: true },
      { removeAttrs: { attrs: '(stroke|fill|stroke-width)' } }
    ]
  });

  return svgo.optimize(svg).then(({ data }) => data);
};
