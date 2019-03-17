// TODO: Replace this function with a simple library that allows manipulation of the query string.
function querySelectedType() {
  let match = window.location.search.match(/type=([^&]+)/);
  return match ? match[1] : null;
}

// TODO: Replace this function with a simple library that allows manipulation of the query string.
function setQuerySelectedType(type) {
  let search = type ? `?type=${ type }` : "";

  // TODO: Replace  this with a native browser implementation
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
