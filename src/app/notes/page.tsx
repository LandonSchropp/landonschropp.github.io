import { NoteSummaries } from "@/components/note-summaries";
import { fetchNoteSummaries } from "@/data/notes";
import { ContentLayout } from "@/layouts/content-layout";

export default async function NotesPage() {
  let noteSummaries = await fetchNoteSummaries();

  return (
    <ContentLayout
      title="Landon Schropp - Notes"
      description="My personal notes on books, articles, talks, podcasts and more."
    >
      <NoteSummaries noteSummaries={noteSummaries} />
    </ContentLayout>
  );
}
