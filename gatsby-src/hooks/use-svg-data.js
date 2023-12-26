import { graphql, useStaticQuery } from "gatsby";
import _ from "lodash";

const QUERY = graphql`
  query svgData {
    allSvgData {
      nodes {
        shapes {
          id
          d
          points
          shape
        }
        viewBox
        name
      }
    }
  }
`;

function transformSVGDatum({ shapes, ...image }) {
  return {
    ...image,
    shapes: _.keyBy(shapes, "id"),
  };
}

/**
 * Returns the SVG image data.
 */
export function useSVGData(name) {
  const svgData = useStaticQuery(QUERY).allSvgData.nodes;
  let svgDatum = _.find(svgData, { name });

  if (_.isNil(svgDatum)) {
    throw new Error(`An image with the name '${name}' couldn't be found.`);
  }

  return transformSVGDatum(svgDatum);
}
