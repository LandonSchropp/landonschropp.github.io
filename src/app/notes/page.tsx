import { NoteSummaries } from "@/components/note-summaries";
import { fetchNoteSummaries } from "@/data/notes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landon Schropp - Notes",
  description: "My personal notes on books, articles, talks, podcasts and more.",
};

export default async function NotesPage() {
  let noteSummaries = await fetchNoteSummaries();
  return <NoteSummaries noteSummaries={noteSummaries} />;
}
