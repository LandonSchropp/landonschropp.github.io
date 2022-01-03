const FILES = [ "portrait.svg", "landscape.svg" ];
const _ = require("lodash");
const { XMLParser } = require("fast-xml-parser");

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

/**
 * This is a helper functio that can be used to quickly create data nodes in Gatsby.
 * @param parent The parent node that will have data appended to it.
 * @param type A string representing the new node type.
 * @param gatsby The gatsby properties passed to onCreateNode.
 * @param data The data to be included in the node.
 */
function createDataNode(parent, type, {
  actions: { createNode, createParentChildLink },
  createNodeId,
  createContentDigest
}, data) {
  const dataNode = {
    ...data,
    id: createNodeId(`${ parent.id } >>> ${ type }`),
    children: [],
    parent: parent.id,
    internal: {
      contentDigest: createContentDigest(data),
      type
    }
  };

  createNode(dataNode);
  createParentChildLink({ parent, child: dataNode });
}

exports.onCreateNode = async ({ node, loadNodeContent, ...gatsby }) => {

  // If the file is not an index page image, ignore it.
  if (!FILES.includes(node.base)) {
    return;
  }

  // Parse the data.
  let svgData = parser.parse(await loadNodeContent(node));

  // Convert the data to a more useful format.
  let data = {
    name: node.base.replace(/\.svg$/, ""),
    viewBox: svgData.svg.viewBox,
    shapes: [
      ...extractPaths(svgData.svg.g.path),
      ...extractPolygons(svgData.svg.g.polygon)
    ]
  };

  createDataNode(node, "IndexPageImage", gatsby, data);
};
