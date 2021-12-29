const FILES = [ "portrait.svg", "landscape.svg" ];
const _ = require("lodash");
const { XMLParser } = require("fast-xml-parser");

const parser = new XMLParser({ ignoreAttributes : false, attributeNamePrefix : "" });

function extractPolygon({ id, points }) {
  return { id, points, shape: "polygon" };
}

function extractPolygons(polygons) {
  if (_.isNil(polygons)) {
    return [];
  }

  return _.isArray(polygons) ? polygons.map(extractPolygon) : [ extractPolygon(polygons) ];
}

function extractPath({ id, d }) {
  return { id, d, shape: "path" };
}

function extractPaths(paths) {
  if (_.isNil(paths)) {
    return [];
  }

  return _.isArray(paths) ? paths.map(extractPath) : [ extractPath(paths) ];
}

exports.onCreateNode = async ({ node, loadNodeContent, ...parameters }) => {

  // If the file is not an index page image, ignore it.
  if (!FILES.includes(node.base)) {
    return;
  }

  // Parse the data.
  let svgData = parser.parse(await loadNodeContent(node));

  // Convert the data to a more useful format.
  let data = {
    viewBox: svgData.svg.viewBox,
    shapes: [
      ...extractPaths(svgData.svg.g.path),
      ...extractPolygons(svgData.svg.g.polygon)
    ]
  }

  console.log(data);
}
