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
import tailwindConfig from "../../tailwind.config.js";

type ContentLayoutProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  category?: Category;
};

const COLORS = {
  Business: tailwindConfig.theme.colors.cornflower,
  Development: tailwindConfig.theme.colors.purple,
  Design: tailwindConfig.theme.colors.amethyst,
  Psychology: tailwindConfig.theme.colors.mulberry,
  Chess: tailwindConfig.theme.colors.bittersweet,
  Other: tailwindConfig.theme.colors.bittersweet,
} as const;

export function ContentLayout({ title, description, children, category }: ContentLayoutProps) {
  const style = { "--accent-color": COLORS[category ?? "Business"] } as React.CSSProperties;

  return (
    <BaseLayout title={title} description={description}>
      <main style={style} className="max-w-[70ch] mx-auto px-2 md:px-4">
        {children}
      </main>
    </BaseLayout>
  );
}
