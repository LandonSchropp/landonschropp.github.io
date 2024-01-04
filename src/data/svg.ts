import landscapeData from "@/images/data/landscape.svg?raw";
import notFoundData from "@/images/data/not-found.svg?raw";
import portraitData from "@/images/data/portrait.svg?raw";
import { SvgData, SvgDataPathShape, SvgDataPolygonShape, SvgDataShape } from "@/types";
import { XmlDocument, XmlElement, parseXml } from "@rgrove/parse-xml";
import getBounds from "svg-path-bounds";

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
export function parseSvgData(svg: string): SvgData {
  const svgElement = findXmlElement(parseXml(svg), "svg");

  const paths = findXmlElements(svgElement, "path").map((element): SvgDataPathShape => {
    const bounds = getBounds(element.attributes.d);

    return {
      type: "path" as const,
      id: element.attributes.id,
      d: element.attributes.d,
      bounds: [bounds[0], bounds[1], bounds[2] - bounds[0], bounds[3] - bounds[1]],
    };
  });

  const polygons = findXmlElements(svgElement, "path").map((element): SvgDataPolygonShape => {
    return {
      type: "polygon" as const,
      id: element.attributes.id,
      points: element.attributes.points,
    };
  });

  return { viewBox: svgElement.attributes.viewBox, shapes: [...paths, ...polygons] };
}

export const NOT_FOUND_SVG_DATA = parseSvgData(notFoundData);
export const PORTRAIT_SVG_DATA = parseSvgData(portraitData);
export const LANDSCAPE_SVG_DATA = parseSvgData(landscapeData);

export function findShape(shapes: SvgDataShape[], id: string): SvgDataShape | null {
  return shapes.find((shape) => shape.id === id) ?? null;
}
