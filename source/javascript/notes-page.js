import createHistory from 'history/createBrowserHistory';
const history = createHistory();

const TYPES_QUERY_REGEX = /types=([^&]+)/;

function allTypes() {
  return Array.from(document.querySelectorAll('.tag')).map(tag => tag.dataset.type);
}

// TODO: Replace this function with a simple library that allows manipulation of the query string.
function queryNoteTypes() {
  let match = window.location.search.match(TYPES_QUERY_REGEX);
  if (match === null) { return allTypes(); }
  return match[1] === "none" ? [] : match[1].split(',');
}

// TODO: Replace this function with a simple library that allows manipulation of the query string.
function setQueryNoteTypes(types) {
  let search;

  if (types.length === allTypes().length) {
    search = "";
  }
  else if (types.length === 0) {
    search = "?types=none";
  }
  else {
    search = `?types=${ types.join(",") }`;
  }

  // TODO: Replace  this with a native browser implementation
  history.replace(`${ window.location.pathname }${ search }`);
}

function visibleNoteTypes() {
  return Array.from(document.querySelectorAll('.tag'))
    .filter(tag => !tag.classList.contains('tag--deselected'))
    .map(tag => tag.dataset.type);
}

function toggleTagAndNoteSelections(noteTypes) {

  // Mark the tags as selected or deselected
  document.querySelectorAll('.tag').forEach(tag => {
    tag.classList.toggle('tag--deselected', !noteTypes.includes(tag.dataset.type));
  });

  // Show and hide the notes
  document.querySelectorAll('.note-summary').forEach(note => {
    note.classList.toggle('note-summary--hidden', !noteTypes.includes(note.dataset.type));
  });
}

function onAnchorClick(event) {

  // Prevent the default even behavior.
  event.stopPropagation();
  event.preventDefault();

  // Mark the tag as deselected
  event.target.classList.toggle('tag--deselected');

  // Update the tags and notes
  let types = visibleNoteTypes();
  toggleTagAndNoteSelections(types);
  setQueryNoteTypes(types);
}

export default function notesPage() {

  // Handle anchor clicks
  document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', onAnchorClick);
  });

  // Handle the initial query on page load
  toggleTagAndNoteSelections(queryNoteTypes());
}
