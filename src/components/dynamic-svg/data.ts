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

type DynamicSVGShapeData = {
  width: number;
  height: number;
  content: string;
};

function extractSVGData(svg: string): DynamicSVGShapeData {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svg, "image/svg+xml");

  const svgElement = doc.querySelector("svg");

  if (svgElement === null) {
    throw new Error(`No SVG element found in: ${svg}`);
  }

  const { width, height } = svgElement.viewBox.baseVal;

  return {
    width,
    height,
    content: svgElement.innerHTML.trim().replaceAll("black", "currentColor"),
  };
}

// TODO: Move this data into a server function to ensure that the data is loaded at build time.
export const chessCom = extractSVGData(chessComRaw);
export const designer = extractSVGData(designerRaw);
export const developer = extractSVGData(developerRaw);
export const email = extractSVGData(emailRaw);
export const entrepreneurComma = extractSVGData(entrepreneurCommaRaw);
export const entrepreneur = extractSVGData(entrepreneurRaw);
export const github = extractSVGData(githubRaw);
export const landon = extractSVGData(landonRaw);
export const linkedIn = extractSVGData(linkedInRaw);
export const notFound = extractSVGData(notFoundRaw);
export const notes = extractSVGData(notesRaw);
export const schropp = extractSVGData(schroppRaw);
export const til = extractSVGData(tilRaw);
export const writing = extractSVGData(writingRaw);
