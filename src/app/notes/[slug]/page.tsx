import { Note } from "@/components/notes/note";
import { NAME } from "@/constants";
import { fetchNotes, fetchNote } from "@/data/notes";
import { Metadata } from "next";

export async function generateStaticParams() {
  return (await fetchNotes()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: NotePageProps): Promise<Metadata> {
  const params = await props.params;

  const { slug } = params;

  const note = await fetchNote(slug);

  return {
    title: note.title,
    description: `${NAME}'s notes about ${note.title}`,
    authors: [{ name: NAME }],
  };
}

type NotePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function NotePage(props: NotePageProps) {
  const params = await props.params;

  const { slug } = params;

  return <Note note={await fetchNote(slug)} />;
}
