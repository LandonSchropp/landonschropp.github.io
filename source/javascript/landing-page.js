import { updateElements, updateViewBox } from "./dom";

function currentTemplate() {
  return window.matchMedia("(max-aspect-ratio: 1 / 1)").matches
    ? "portrait"
    : "landscape";
}

let lastTemplate = null;

function update() {
  let template = currentTemplate();

  if (template === lastTemplate) {
    return;
  }

  let landing = document.querySelector(".landing__svg");
  let paths = landing.querySelectorAll("path[id], polygon[id]");

  lastTemplate = template;
  updateViewBox(template, landing);
  updateElements(template, paths);
}

export default function landingPage() {

  // Update the landing SVG right away. We don't need a ready even because this script is loaded
  // after the landing SVG.
  update();

  // Whenever the window size changes, update the viewBox.
  window.addEventListener("resize", update);
}
