import queryString from 'query-string';

function query() {
  return queryString.parse(window.location.search);
}

function querySelectedType() {
  return query().type || null;
}

function setQuerySelectedType(type) {
  let search = type ? `?${ queryString.stringify({ ...query(), type }) }` : "";

  history.replaceState(
    {},
    document.title,
    `${ window.location.pathname }${ search }`
  );
}

function isDeselected(element, selectedType) {
  return selectedType !== null && element.dataset.type !== selectedType;
}

function toggleTagAndNoteSelections(selectedType) {

  // Mark the tags as selected
  document.querySelectorAll('.tag').forEach(tag => {
    tag.classList.toggle('tag--deselected', isDeselected(tag, selectedType));
  });

  // Show and hide the notes
  document.querySelectorAll('.note-summary').forEach(note => {
    note.classList.toggle('note-summary--hidden', isDeselected(note, selectedType));
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
  document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', onAnchorClick);
  });

  // Handle the initial query on page load
  toggleTagAndNoteSelections(querySelectedType());
}
