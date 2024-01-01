import "../styles/content/anchors.css";
import "../styles/content/audios.css";
import "../styles/content/blockquotes.css";
import "../styles/content/cite.css";
import "../styles/content/code.css";
import "../styles/content/headers.css";
import "../styles/content/hr.css";
import "../styles/content/image.css";
import "../styles/content/lists.css";
import "../styles/content/paragraphs.css";
import "../styles/content/pre.css";

import type { Category } from "../types";
import { BaseLayout } from "./base-layout";
import { categoryColor } from "../utilities/colors.js";

type ContentLayoutProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  category?: Category;
};

export function ContentLayout({ title, description, children, category }: ContentLayoutProps) {
  const style = { "--accent-color": categoryColor(category) } as React.CSSProperties;

  return (
    <BaseLayout title={title} description={description}>
      <main style={style} className="max-w-[70ch] mx-auto px-2 md:px-4">
        {children}
      </main>
    </BaseLayout>
  );
}
