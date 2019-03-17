const fs = require('fs');

module.exports = function includeLandingPageSVG(path) {

  // Read the image from the file
  let svg = fs.readFileSync(`${ __dirname }/../images/${ path }`, 'utf8');

  // Remove the <?xml?> tag and undesired attributes
  svg = svg.substring(svg.indexOf("\n") + 1)
    .replace(/\s+width="[^"]+"/, '')
    .replace(/\s+height="[^"]+"/, '')
    .replace(/\s+version="[^"]+"/, '')
    .replace(/\s+fill="[^"]+"/g, '')
    .replace(/\s+xmlns="[^"]+"/, '')
    .replace(/\s+xmlns:xlink="[^"]+"/, '');

  // Clean up the unneeded metadata for the image

  // Return the resulting SVg
  return svg;
};
