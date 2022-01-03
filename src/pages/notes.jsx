import React from "react";

import { useNotes } from "../hooks/use-notes";
import { Layout } from "../layout/layout";

export default function NotesPage() {
  let notes = useNotes();

  return <Layout navigation={ false } className="notes-page">
    <h1>Notes</h1>

    {
      notes.map(({ title, slug }) => <h2 key={ slug }>{ title }</h2>)
    }
  </Layout>;
}
