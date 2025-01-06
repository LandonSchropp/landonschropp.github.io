import { BOOK_MEDIA } from "@/constants";
import { fetchNotes } from "@/data/notes";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const notes = await fetchNotes();
  return notes
    .filter((note) => note.media === BOOK_MEDIA)
    .map((note) => ({ isbn: note.isbn.toString() }));
}

type ImagePageProps = {
  params: Promise<{ isbn: string }>;
};

export async function GET(_request: Request, props: ImagePageProps) {
  const { isbn } = await props.params;
  return fetch(`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`);
}
