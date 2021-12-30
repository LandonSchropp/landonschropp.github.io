import { graphql, useStaticQuery } from "gatsby";
import _ from "lodash";

const QUERY = graphql`
  query IndexPageImages {
    allIndexPageImage {
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

function transformIndexPageImage({ shapes, ...image }) {
  return {
    ...image,
    shapes: _.keyBy(shapes, "id")
  };
}

/**
 * Returns the index page image data.
 */
export function useIndexPageImages() {
  const images = useStaticQuery(QUERY).allIndexPageImage.nodes;
  return _.keyBy(images.map(transformIndexPageImage), "name");
}
