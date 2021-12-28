const FILES = [ "portrait.svg", "landscape.svg" ];

async function onCreateNode({
  node,
  ...parameters
}) {
  if (_.some(FILES, file => node.internal.description.includes(file))) {
    console.log(node.basename);
  }

  // const { createNode, createParentChildLink } = actions;

  // const rawXml = await loadNodeContent(node);
  // const parsedXml = parseXml(rawXml);
  // const nodeArray = parsedXml.root.children.map((obj, i) => {
  //   if (obj.children) {
  //     obj.xmlChildren = obj.children;
  //     delete obj.children;
  //   }
  //   return {
  //     ...obj,
  //     id: obj.attributes.id
  //       ? obj.attributes.id
  //       : createNodeId(`${ node.id } [${ i }] >>> XML`),
  //     parent: node.id,
  //     children: [],
  //     internal: {
  //       contentDigest: createContentDigest(obj),
  //       type: _.upperFirst(_.camelCase(`${ node.name } xml`))
  //     }
  //   };
  // });

  // _.each(nodeArray, j => {
  //   createNode(j);
  //   createParentChildLink({ parent: node, child: j });
  // });
}

exports.onCreateNode = onCreateNode;
