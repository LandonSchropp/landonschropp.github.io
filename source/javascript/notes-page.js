function visibleNoteTypes() {
  return Array.from(document.querySelectorAll('.tag'))
    .filter(tag => !tag.classList.contains('tag--deselected'))
    .map(tag => tag.dataset.type);
}

function toggleNoteSummaries() {
  let noteTypes = visibleNoteTypes();

  document.querySelectorAll('.note-summary').forEach(note => {
    note.classList.toggle('note-summary--hidden', !noteTypes.includes(note.dataset.type));
  });
}

export default function notesPage() {

  document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', event => {
      event.stopPropagation();
      event.preventDefault();

      // Mark the tag as deselected
      event.target.classList.toggle('tag--deselected');

      // Toggle the note summaries
      toggleNoteSummaries();
    });
  });
}
