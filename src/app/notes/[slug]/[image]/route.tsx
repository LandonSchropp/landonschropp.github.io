import { extractImageSlugPairs } from "@/data/content";
import { downloadImage } from "@/data/image";
import { fetchNote, fetchNotes } from "@/data/notes";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const notes = await fetchNotes();
  return extractImageSlugPairs(notes);
}

type ImagePageProps = {
  params: Promise<{ slug: string; image: string }>;
};

export async function GET(_request: Request, props: ImagePageProps) {
  const params = await props.params;
  const note = await fetchNote(params.slug);
  return downloadImage(note, params.image);
}
