import { Note } from "@/components/note";
import { fetchNoteSummaries, fetchNote } from "@/data/notes";
import { Metadata } from "next";

export async function generateStaticParams() {
  let noteSummaries = await fetchNoteSummaries();
  return noteSummaries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params: { slug } }: NotePageProps): Promise<Metadata> {
  let note = await fetchNote(slug);

  return {
    title: `Landon Schropp -  ${note.title}`,
    description: `Landon Schropp's notes about ${note.title}`,
  };
}

type NotePageProps = {
  params: {
    slug: string;
  };
};

export default async function NotePage({ params: { slug } }: NotePageProps) {
  return <Note note={await fetchNote(slug)} />;
}
