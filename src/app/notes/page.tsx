import { NoteSummaries } from "@/components/notes/note-summaries";
import { fetchNotes } from "@/data/notes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes",
  description: "My personal notes on books, articles, talks, podcasts and more.",
};

export default async function NotesPage() {
  const notes = await fetchNotes();
  return <NoteSummaries notes={notes} />;
}
