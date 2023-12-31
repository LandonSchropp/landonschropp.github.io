import { render, screen } from "@testing-library/react";

import { NoteHeader } from "../../src/components/note-header";
import {
  BUSINESS_CATEGORY,
  OTHER_MEDIA,
  ARTICLE_MEDIA,
  BOOK_MEDIA,
  LIVE_TALK_MEDIA,
  TALK_MEDIA,
  PODCAST_MEDIA,
  VIDEO_MEDIA,
} from "../constants";
import type { Note } from "../types";

describe("NoteHeader", () => {
  let note: Note;

  beforeEach(() => {
    note = {
      id: "1234",
      title: "Title",
      authors: ["Author"],
      category: BUSINESS_CATEGORY,
      media: OTHER_MEDIA,
      date: new Date("1988-10-05"),
      published: true,
      slug: "slug",
      source: "Source",
      url: "https://example.com",
      content: "",
    };
  });

  describe("when the note's authors, source and title are all the same", () => {
    beforeEach(() => {
      note.media = OTHER_MEDIA;
      note.authors = [note.title];
      note.source = note.title;
      render(<NoteHeader note={note} />);
    });

    it("sets the title", () => {
      expect(screen.getByRole("heading").textContent).toEqual("My personal notes for Title");
    });

    it("does not render a subheader", () => {
      expect(screen.getByTestId("sub-text").textContent).toEqual("");
    });
  });

  describe("when the source and title are the same and the note does not have any authors", () => {
    beforeEach(() => {
      note.media = OTHER_MEDIA;
      note.authors = [];
      note.source = note.title;
      render(<NoteHeader note={note} />);
    });

    it("sets the title", () => {
      expect(screen.getByRole("heading").textContent).toEqual("My personal notes for Title");
    });

    it("does not render a subheader", () => {
      expect(screen.getByTestId("sub-text").textContent).toEqual("");
    });
  });

  describe("when the note's author and source are the same", () => {
    beforeEach(() => {
      note.media = OTHER_MEDIA;
      note.authors = [note.source];
      render(<NoteHeader note={note} />);
    });

    it("sets the title", () => {
      expect(screen.getByRole("heading").textContent).toEqual("My personal notes for Title");
    });

    it("does not render the authors", () => {
      expect(screen.getByTestId("sub-text").textContent).toEqual("From Source");
    });
  });

  describe("when the note does not have any authors", () => {
    beforeEach(() => {
      note.media = OTHER_MEDIA;
      note.authors = [];
      render(<NoteHeader note={note} />);
    });

    it("sets the title", () => {
      expect(screen.getByRole("heading").textContent).toEqual("My personal notes for Title");
    });

    it("does not render the authors", () => {
      expect(screen.getByTestId("sub-text").textContent).toEqual("From Source");
    });
  });

  describe("when the note's source and title are the same", () => {
    beforeEach(() => {
      note.media = OTHER_MEDIA;
      note.source = note.title;
      render(<NoteHeader note={note} />);
    });

    it("sets the title", () => {
      expect(screen.getByRole("heading").textContent).toEqual("My personal notes for Title");
    });

    it("does not render the source", () => {
      expect(screen.getByTestId("sub-text").textContent).toEqual("by Author");
    });
  });

  describe("when the note's authors, source and title are all distinct", () => {
    beforeEach(() => {
      note.media = OTHER_MEDIA;
      render(<NoteHeader note={note} />);
    });

    it("sets the title", () => {
      expect(screen.getByRole("heading").textContent).toEqual("My personal notes for Title");
    });

    it("render's the correct subheader", () => {
      expect(screen.getByTestId("sub-text").textContent).toEqual("From Source by Author");
    });
  });

  describe("when the note's author is the same as the source", () => {
    beforeEach(() => {
      note.authors = [note.source];
      render(<NoteHeader note={note} />);
    });

    it("sets the title", () => {
      expect(screen.getByRole("heading").textContent).toEqual("My personal notes for Title");
    });

    it("does not render the authors", () => {
      expect(screen.getByTestId("sub-text").textContent).toEqual("From Source");
    });
  });

  describe("when the note has two authors", () => {
    beforeEach(() => {
      note.authors = ["Sylvester Stallone", "Dolph Lundgren"];
      render(<NoteHeader note={note} />);
    });

    it("sets the title", () => {
      expect(screen.getByRole("heading").textContent).toEqual("My personal notes for Title");
    });

    it("renders the authors with an 'and' between then", () => {
      expect(screen.getByTestId("sub-text").textContent).toEqual(
        "From Source by Sylvester Stallone and Dolph Lundgren",
      );
    });
  });

  describe("when the note has three or more authors", () => {
    beforeEach(() => {
      note.authors = ["Sylvester Stallone", "Dolph Lundgren", "Carl Weathers"];
      render(<NoteHeader note={note} />);
    });

    it("sets the title", () => {
      expect(screen.getByRole("heading").textContent).toEqual("My personal notes for Title");
    });

    it("renders the authors with an 'and' between then", () => {
      expect(screen.getByTestId("sub-text").textContent).toEqual(
        "From Source by Sylvester Stallone, Dolph Lundgren and Carl Weathers",
      );
    });
  });

  describe("when the note is for an article", () => {
    beforeEach(() => {
      note.media = ARTICLE_MEDIA;
      render(<NoteHeader note={note} />);
    });

    it("sets the title", () => {
      expect(screen.getByRole("heading").textContent).toEqual("My personal notes for Title");
    });

    it("render's the correct subheader", () => {
      expect(screen.getByTestId("sub-text").textContent).toEqual(
        "An article by Author from Source",
      );
    });
  });

  describe("when the note is for a book", () => {
    beforeEach(() => {
      note.media = BOOK_MEDIA;
      render(<NoteHeader note={note} />);
    });

    it("sets the title", () => {
      expect(screen.getByRole("heading").textContent).toEqual("My personal notes for Title");
    });

    it("render's the correct subheader", () => {
      expect(screen.getByTestId("sub-text").textContent).toEqual("A book by Author from Source");
    });
  });

  describe("when the note is for a live talk", () => {
    beforeEach(() => {
      note.media = LIVE_TALK_MEDIA;
      render(<NoteHeader note={note} />);
    });

    it("sets the title", () => {
      expect(screen.getByRole("heading").textContent).toEqual("My personal notes for Title");
    });

    it("render's the correct subheader", () => {
      expect(screen.getByTestId("sub-text").textContent).toEqual(
        "A talk by Author I attended at Source",
      );
    });
  });

  describe("when the note is for a talk", () => {
    beforeEach(() => {
      note.media = TALK_MEDIA;
      render(<NoteHeader note={note} />);
    });

    it("sets the title", () => {
      expect(screen.getByRole("heading").textContent).toEqual("My personal notes for Title");
    });

    it("render's the correct subheader", () => {
      expect(screen.getByTestId("sub-text").textContent).toEqual("A talk by Author from Source");
    });
  });

  describe("when the note is for a podcast", () => {
    beforeEach(() => {
      note.media = PODCAST_MEDIA;
      render(<NoteHeader note={note} />);
    });

    it("sets the title", () => {
      expect(screen.getByRole("heading").textContent).toEqual("My personal notes for Title");
    });

    it("render's the correct subheader", () => {
      expect(screen.getByTestId("sub-text").textContent).toEqual(
        "From Source, a podcast by Author",
      );
    });
  });

  describe("when the note is for a video", () => {
    beforeEach(() => {
      note.media = VIDEO_MEDIA;
      render(<NoteHeader note={note} />);
    });

    it("sets the title", () => {
      expect(screen.getByRole("heading").textContent).toEqual("My personal notes for Title");
    });

    it("render's the correct subheader", () => {
      expect(screen.getByTestId("sub-text").textContent).toEqual("A video by Author from Source");
    });
  });
});
