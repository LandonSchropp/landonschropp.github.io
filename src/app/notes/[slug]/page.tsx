import { Note } from "@/components/note";
import { fetchNoteSummaries, fetchNote } from "@/data/notes";

export async function generateStaticParams() {
  let noteSummaries = await fetchNoteSummaries();
  return noteSummaries.map(({ slug }) => ({ slug }));
}

type NotePageProps = {
  params: {
    slug: string;
  };
};

export default async function NotePage({ params: { slug } }: NotePageProps) {
  return <Note note={await fetchNote(slug)} />;
}
