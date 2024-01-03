import { ReactNode } from "react";
import Book from "../images/icons/book.svg?react";

type CalloutProps = {
  children: ReactNode;
};

export function Callout({ children }: CalloutProps) {
  return (
    <section
      className={
        "grid md:grid-cols-[auto_1fr] max-md:grid-rows-[auto_auto] p-3 gap-3 items-center " +
        "md:my-4 mx-6 bg-theme-backgroundHighlight"
      }
    >
      <figure className="w-8 h-8 m-0 p-2 bg-theme-accent rounded-full mx-auto">
        <Book className="w-full h-full text-white" />
      </figure>
      <p className="m-0 italic">{children}</p>
    </section>
  );
}
