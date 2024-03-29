import { Note } from "@/components/notes/note";
import { fetchNoteSummaries, fetchNote } from "@/data/notes";
import { Metadata } from "next";

export async function generateStaticParams() {
  return (await fetchNoteSummaries()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params: { slug } }: NotePageProps): Promise<Metadata> {
  const note = await fetchNote(slug);

  return {
    title: note.title,
    description: `Landon Schropp's notes about ${note.title}`,
    authors: [{ name: "Landon Schropp" }],
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
