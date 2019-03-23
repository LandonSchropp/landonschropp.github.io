import validateNote from './validate-note';

export default function notesCollection(collection) {

  // Grab all of the notes
  let notes = collection.getFilteredByGlob("source/notes/**/*");

  // Validate all of the notes to make sure I didn't accidentally leave something out.
  notes.forEach(validateNote);

  // Return the notes
  return notes;
}
