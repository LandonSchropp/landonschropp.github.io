import { updateViewBox, updateElements } from './dom';

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

  let main = document.querySelector(".main");
  let paths = main.querySelectorAll("path[id], polygon[id]");

  lastTemplate = template;
  updateViewBox(template, main);
  updateElements(template, paths);
}

// Update the main SVG right away. We don't need a ready even because this script is loaded after
// the main SVG.
update();

// Whenever the window size changes, update the viewBox.
window.addEventListener('resize', update);
