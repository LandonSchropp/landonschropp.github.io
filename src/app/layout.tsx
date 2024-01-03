import "../styles/root.css";
import flannel from "../images/flannel.png";

export interface BaseLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: BaseLayoutProps) {
  return (
    <html lang="en-us">
      <head>
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
        className="flex h-full flex-col bg-theme-background text-theme-text *:flex-auto"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
