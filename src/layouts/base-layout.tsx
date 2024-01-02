import "../styles/root.css";
import flannel from "../images/flannel.png";
import type { Category } from "../types";

export interface BaseLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  category?: Category | undefined;
}

export function BaseLayout({ title, description, children, category }: BaseLayoutProps) {
  return (
    <html lang="en-us">
      <head>
        <meta charSet="utf-8" />

        <title>{title}</title>
        <meta name="description" content={description} />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href={
            "https://fonts.googleapis.com/css2?family=Gentium+Book+Plus:ital,wght@0,400;0,700;" +
            "1,400&family=Open+Sans:ital,wght@0,400;0,700;0,800;1,400;1,700;1,800&family=Source+" +
            "Code+Pro:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          }
          rel="stylesheet"
        />

        <link rel="shortcut icon" type="image/png" href={flannel.src} />
      </head>
      <body
        className="bg-theme-background text-theme-text flex flex-col h-full *:flex-auto"
        data-category={category}
      >
        {children}
      </body>
    </html>
  );
}
