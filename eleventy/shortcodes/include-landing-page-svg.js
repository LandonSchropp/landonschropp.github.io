import SVGO from "svgo";
import fs from "fs";

export default function includeLandingPageSVG(path) {

  // Read the image from the file
  let svg = fs.readFileSync(`${ __dirname }/../../source/images/${ path }`, "utf8");

  // Remove the IDs from the image
  svg = svg.replace(/id="([^"]+)"/ig, (match, id) => `data-id="${ id }"`);

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
      { removeAttrs: { attrs: "(stroke|fill|stroke-width)" } }
    ]
  });

  return svgo.optimize(svg).then(({ data }) => data);
}
