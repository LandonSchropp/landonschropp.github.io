import { XmlDocument, XmlElement, parseXml } from "@rgrove/parse-xml";

import notFoundData from "@/images/data/not-found.svg?raw";
import landscapeData from "@/images/data/landscape.svg?raw";
import portraitData from "@/images/data/portrait.svg?raw";
import { SVGData, SvgDataShape } from "@/types";

const SVGS = {
  notFound: notFoundData,
  landscape: landscapeData,
  portrait: portraitData,
} as const;

function isXmlElement(value: unknown): value is XmlElement {
  return value instanceof XmlElement;
}

export function findXmlElements(element: XmlDocument | XmlElement, name: string): XmlElement[] {
  if ("name" in element && element.name === name) {
    return [element];
  }

  return element.children.filter(isXmlElement).flatMap((child) => findXmlElements(child, name));
}

export function findXmlElement(element: XmlDocument | XmlElement, name: string): XmlElement {
  const elements = findXmlElements(element, name);

  if (elements.length === 0) {
    throw new Error(`Could not find ${name} element.`);
  }

  if (elements.length > 1) {
    throw new Error(`Found more than one ${name} element`);
  }

  return elements[0];
}

/**
 * Extracts the data from an SVG.
 */
export function parseSvgData(name: keyof typeof SVGS): SVGData {
  let svg = findXmlElement(parseXml(SVGS[name]), "svg");

  let paths = findXmlElements(svg, "path").map((element) => {
    return {
      type: "path" as const,
      id: element.attributes.id,
      d: element.attributes.d,
    };
  });

  let polygons = findXmlElements(svg, "path").map((element) => {
    return {
      type: "polygon" as const,
      id: element.attributes.id,
      points: element.attributes.points,
    };
  });

  return { viewBox: svg.attributes.viewBox, shapes: [...paths, ...polygons] };
}

export function findShape(shapes: SvgDataShape[], id: string): SvgDataShape {
  let shape = shapes.find((shape) => shape.id === id);

  if (!shape) {
    throw new Error(`Could not find shape with id '${id}'`);
  }

  return shape;
}
