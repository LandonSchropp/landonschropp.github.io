import flannel from "../images/flannel.png";
import "../styles/index.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Landon Schropp",
    template: "Landon Schropp – %s",
  },
  description: "Landon Schropp is a developer, designer and entrepreneur based in Portland, OR.",
};

export interface BaseLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: BaseLayoutProps) {
  return (
    <html lang="en-us" className="h-full text-[19px] md:text-[21px] lg:text-[22px]">
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
        className={
          "flex h-full flex-col bg-theme-background font-serif font-normal " +
          "text-theme-text *:flex-[0_0_auto]"
        }
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
