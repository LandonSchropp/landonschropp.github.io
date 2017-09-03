---
layout: null
---

const PORTRAIT_MEDIA_QUERY = "(max-aspect-ratio: 3/4)";
const PORTRAIT_TEMPLATE_ID = "portrait";
const LANDSCAPE_TEMPLATE_ID = "landscape";

// This is like memoize, except it forgets the old value as soon as the value changes.
function whenArgumentChanged(func) {
  let last = {};

  return function(value) {
    if (value == last) { return }
    last = value;
    func(value);
  }
}

function mediaQueryMatches(mediaQuery) {
  return window.matchMedia(mediaQuery).matches;
}

function currentTemplate() {
  return mediaQueryMatches(PORTRAIT_MEDIA_QUERY)
    ? PORTRAIT_TEMPLATE_ID
    : LANDSCAPE_TEMPLATE_ID;
}

function templateFragment(template) {
  return document.getElementById(template).content;
}

function templateViewBox(template) {
  return templateFragment(template).children[0].getAttribute("viewBox");
}

function updateViewBox(template, element) {
  element.setAttribute("viewBox", templateViewBox(template));
}

function templateAttribute(template, id, attribute) {
  let element = templateFragment(template).getElementById(id);
  return element && element.getAttribute(attribute);
}

function updateElement(template, element) {
  let attribute = /path/.test(element.nodeName) ? "d" : "points";
  element.setAttribute(attribute, templateAttribute(template, element.id, attribute) || "");
}

function updateElements(template, elements) {
  elements.forEach(element => updateElement(template, element));
}

function update(template) {
  let main = document.querySelector(".main")
  let paths = main.querySelectorAll("path[id], polygon[id]")

  updateViewBox(template, main)
  updateElements(template, paths);
}

// This function only updates the DOM when the provided template *changes*. Otherwise, it has no
// effect.
const updateWhenTemplateChanged = whenArgumentChanged(update);
const updateWithCurrentTemplate = () => updateWhenTemplateChanged(currentTemplate());

// Update the main SVG right away. We don't need a ready even because we know the structure of the
// DOM, and that this script is loaded after the main SVG.
updateWithCurrentTemplate();


// Whenever the window size changes, update the viewBox.
window.addEventListener('resize', updateWithCurrentTemplate);
