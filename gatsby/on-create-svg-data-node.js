const _ = require("lodash");
const { XMLParser } = require("fast-xml-parser");
const { createDataNode } = require("./data-node");
const { camelCase } = require("voca");

const DATA_DIRECTORY = "src/images/data";

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "" });

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

exports.onCreateSVGDataNode = async ({ node, loadNodeContent, ...gatsby }) => {

  // If the file is not an image we want to extract data from, ignore it.
  if (!node.dir?.endsWith(DATA_DIRECTORY)) {
    return;
  }

  // Parse the data.
  let svgData = parser.parse(await loadNodeContent(node));

  // Convert the SVG data to a more useful format.
  let data = {
    name: camelCase(node.base.replace(`.${ node.extension }`, "")),
    viewBox: svgData.svg.viewBox,
    shapes: [
      ...extractPaths(svgData.svg.g.path),
      ...extractPolygons(svgData.svg.g.polygon)
    ]
  };

  createDataNode(node, "SVGData", gatsby, data);
};
