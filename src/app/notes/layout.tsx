import { MainNavigation } from "@/components/navigation/main-navigation";
import "@/styles/content/anchors.css";
import "@/styles/content/audios.css";
import "@/styles/content/blockquotes.css";
import "@/styles/content/cite.css";
import "@/styles/content/code.css";
import "@/styles/content/headers.css";
import "@/styles/content/highlight-js.css";
import "@/styles/content/hr.css";
import "@/styles/content/iframe.css";
import "@/styles/content/image.css";
import "@/styles/content/lists.css";
import "@/styles/content/paragraphs.css";
import "@/styles/content/pre.css";
import "@/styles/content/tables.css";

type ContentLayoutProps = {
  children: React.ReactNode;
};

export default function NotesLayout({ children }: ContentLayoutProps) {
  return (
    <>
      <MainNavigation />
      <main className="mx-auto w-[70ch] max-w-full px-2 md:px-4">{children}</main>
    </>
  );
}
