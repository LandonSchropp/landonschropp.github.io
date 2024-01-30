import { NoteSummaries } from "@/components/notes/note-summaries";
import { fetchNoteSummaries } from "@/data/notes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes",
  description: "My personal notes on books, articles, talks, podcasts and more.",
};

export default async function NotesPage() {
  const noteSummaries = await fetchNoteSummaries();
  return <NoteSummaries noteSummaries={noteSummaries} />;
}
