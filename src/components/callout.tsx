import { ReactNode } from "react";
import Book from "../images/icons/book.svg?react";

type CalloutProps = {
  children: ReactNode;
};

export function Callout({ children }: CalloutProps) {
  return (
    <section
      className={
        "max-md:grid-rows-[auto_auto] grid items-center gap-3 p-3 md:grid-cols-[auto_1fr] " +
        "mx-6 bg-theme-backgroundHighlight md:my-4"
      }
    >
      <figure className="m-0 mx-auto h-8 w-8 rounded-full bg-theme-accent p-2">
        <Book className="h-full w-full text-white" />
      </figure>
      <p className="m-0 italic">{children}</p>
    </section>
  );
}
