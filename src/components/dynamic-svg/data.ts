import ampersandRaw from "@/images/data/ampersand.svg?raw";
import chessComRaw from "@/images/data/chess-com.svg?raw";
import designerRaw from "@/images/data/designer.svg?raw";
import developerRaw from "@/images/data/developer.svg?raw";
import emailRaw from "@/images/data/email.svg?raw";
import entrepreneurCommaRaw from "@/images/data/entrepreneur-comma.svg?raw";
import entrepreneurRaw from "@/images/data/entrepreneur.svg?raw";
import githubRaw from "@/images/data/github.svg?raw";
import landonRaw from "@/images/data/landon.svg?raw";
import linkedInRaw from "@/images/data/linkedin.svg?raw";
import notFoundRaw from "@/images/data/not-found.svg?raw";
import notesRaw from "@/images/data/notes.svg?raw";
import schroppRaw from "@/images/data/schropp.svg?raw";
import tilRaw from "@/images/data/til.svg?raw";
import writingRaw from "@/images/data/writing.svg?raw";
import { DynamicSVGShape } from "@/types";

const SVG_TAG_REGEX = /<svg([^>]*)>\s*([\s\S]*)\s*<\/svg>/i;
const WIDTH_REGEX = /width="(\d+)"/i;
const HEIGHT_REGEX = /height="(\d+)"/i;

function extractSVGData(id: string, svg: string): DynamicSVGShape {
  const match = SVG_TAG_REGEX.exec(svg);

  if (match === null) {
    throw new Error(`Invalid SVG data: ${svg}`);
  }

  const [, attributes, content] = match;

  const widthMatch = WIDTH_REGEX.exec(attributes)?.[1];
  const heightMatch = HEIGHT_REGEX.exec(attributes)?.[1];

  if (widthMatch === undefined || heightMatch === undefined) {
    throw new Error(`Invalid SVG dimensions: ${attributes}`);
  }

  const width = Number(widthMatch);
  const height = Number(heightMatch);

  return { id, width, height, content };
}

// TODO: Move this data into a server function to ensure that the data is loaded at build time.
export const ampersand = extractSVGData("ampersand", ampersandRaw);
export const chessCom = extractSVGData("chess-com", chessComRaw);
export const designer = extractSVGData("designer", designerRaw);
export const developer = extractSVGData("developer", developerRaw);
export const email = extractSVGData("email", emailRaw);
export const entrepreneurComma = extractSVGData("entrepreneur-comma", entrepreneurCommaRaw);
export const entrepreneur = extractSVGData("entrepreneur", entrepreneurRaw);
export const github = extractSVGData("github", githubRaw);
export const landon = extractSVGData("landon", landonRaw);
export const linkedIn = extractSVGData("linked-in", linkedInRaw);
export const notFound = extractSVGData("not-found", notFoundRaw);
export const notes = extractSVGData("notes", notesRaw);
export const schropp = extractSVGData("schropp", schroppRaw);
export const til = extractSVGData("til", tilRaw);
export const writing = extractSVGData("writing", writingRaw);
