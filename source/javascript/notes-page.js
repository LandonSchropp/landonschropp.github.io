import queryString from "query-string";
import titleCase from "voca/title_case";
import isNil from "lodash/isNil";

function query() {
  return queryString.parse(window.location.search);
}

function querySelectedType() {
  return query().type || null;
}

function setQuerySelectedType(type) {
  let search = type ? `?${ queryString.stringify({ ...query(), type }) }` : "";
  let title = `Landon Schropp - Notes ${ type ? `- ${ titleCase(type) }s` : "" }`;

  history.replaceState(
    {},
    title,
    `${ window.location.pathname }${ search }`
  );

  document.title = title;
}

function isSelected(element, selectedType) {
  return element.dataset.type === selectedType;
}

function isVisible(element, selectedType) {
  return isNil(selectedType) || isSelected(element, selectedType);
}

function toggleTagAndNoteSelections(selectedType) {

  // Mark the tags as selected
  document.querySelectorAll(".tag").forEach(tag => {
    tag.classList.toggle("tag--selected", isSelected(tag, selectedType));
  });

  // Show and hide the notes
  document.querySelectorAll(".note-summary").forEach(note => {
    note.classList.toggle("note-summary--hidden", !isVisible(note, selectedType));
  });
}

function onAnchorClick(event) {

  // Prevent the default even behavior.
  event.stopPropagation();
  event.preventDefault();

  // Update the tags and notes with the new selected type
  let selectedType = querySelectedType() === event.target.dataset.type
    ? null
    : event.target.dataset.type;

  toggleTagAndNoteSelections(selectedType);
  setQuerySelectedType(selectedType);
}

export default function notesPage() {

  // Handle anchor clicks
  document.querySelectorAll(".tag").forEach(tag => {
    tag.addEventListener("click", onAnchorClick);
  });

  // Handle the initial query on page load
  toggleTagAndNoteSelections(querySelectedType());
}
