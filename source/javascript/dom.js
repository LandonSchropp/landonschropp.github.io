export function templateFragment(template) {
  return document.getElementById(template).content;
}

export function templateViewBox(template) {
  return templateFragment(template).children[0].getAttribute("viewBox");
}

export function templateAttribute(template, id, attribute) {
  let element = templateFragment(template).querySelector(`[data-id="${ id }"]`);
  return element && element.getAttribute(attribute);
}

export function updateViewBox(template, element) {
  element.setAttribute("viewBox", templateViewBox(template));
}

export function updateElement(template, element) {
  let attribute = /path/.test(element.nodeName) ? "d" : "points";
  element.setAttribute(attribute, templateAttribute(template, element.id, attribute) || "");
}

export function updateElements(template, elements) {
  elements.forEach(element => updateElement(template, element));
}
