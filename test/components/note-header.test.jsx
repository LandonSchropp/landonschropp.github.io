import { render, screen } from "@testing-library/react";
import React from "react";

import { NoteHeader } from "../../src/components/note-header";
import {
  ARTICLE_MEDIA,
  BOOK_MEDIA,
  LIVE_TALK_MEDIA,
  OTHER_MEDIA,
  PODCAST_MEDIA,
  TALK_MEDIA,
  VIDEO_MEDIA
} from "../../src/data/constants";

describe("NoteHeader", () => {
  let note;

  beforeEach(() => {
    note = {
      title: "Title",
      authors: [ "Author" ],
      category: OTHER_MEDIA,
      date: "1988-10-05",
      published: true,
      slug: "slug",
      source: "Source",
      url: "https://example.com"
    };
  });

  describe("when the note's authors, source and title are all the same", () => {

    beforeEach(() => {
      note.category = OTHER_MEDIA;
      note.authors = [ note.title ];
      note.source = note.title;
      render(<NoteHeader note={ note } content="" />);
    });

    it("sets the title", () => {
      expect(screen.getByRole("heading").textContent).toEqual("My personal notes for Title");
    });

    it("does not render a subheader", () => {
      expect(screen.getByTestId("subhead").textContent).toEqual("");
    });
  });

  describe("when the note's author and source are the same", () => {
    beforeEach(() => {
      note.category = OTHER_MEDIA;
      note.authors = [ note.source ];
      render(<NoteHeader note={ note } content="" />);
    });

    it("sets the title", () => {
      expect(screen.getByRole("heading").textContent).toEqual("My personal notes for Title");
    });

    it("does not render the authors", () => {
      expect(screen.getByTestId("subhead").textContent).toEqual("From Source");
    });
  });

  describe("when the note's source and title are the same", () => {
    beforeEach(() => {
      note.category = OTHER_MEDIA;
      note.source = note.title;
      render(<NoteHeader note={ note } content="" />);
    });

    it("sets the title", () => {
      expect(screen.getByRole("heading").textContent).toEqual("My personal notes for Title");
    });

    it("does not render the source", () => {
      expect(screen.getByTestId("subhead").textContent).toEqual("by Author");
    });
  });

  describe("when the note's authors, source and title are all distinct", () => {
    beforeEach(() => {
      note.category = OTHER_MEDIA;
      render(<NoteHeader note={ note } content="" />);
    });

    it("sets the title", () => {
      expect(screen.getByRole("heading").textContent).toEqual("My personal notes for Title");
    });

    it("render's the correct subheader", () => {
      expect(screen.getByTestId("subhead").textContent).toEqual("From Source by Author");
    });
  });

  describe("when the note does not have any authors", () => {
    beforeEach(() => {
      note.authors = [ note.source ];
      render(<NoteHeader note={ note } content="" />);
    });

    it("sets the title", () => {
      expect(screen.getByRole("heading").textContent).toEqual("My personal notes for Title");
    });

    it("does not render the authors", () => {
      expect(screen.getByTestId("subhead").textContent).toEqual("From Source");
    });
  });

  describe("when the note has two authors", () => {
    beforeEach(() => {
      note.authors = [ "Sylvester Stallone", "Dolph Lundgren" ];
      render(<NoteHeader note={ note } content="" />);
    });

    it("sets the title", () => {
      expect(screen.getByRole("heading").textContent).toEqual("My personal notes for Title");
    });

    it("renders the authors with an 'and' between then", () => {
      expect(screen.getByTestId("subhead").textContent).toEqual(
        "From Source by Sylvester Stallone and Dolph Lundgren"
      );
    });
  });

  describe("when the note has three or more authors", () => {
    beforeEach(() => {
      note.authors = [ "Sylvester Stallone", "Dolph Lundgren", "Carl Weathers" ];
      render(<NoteHeader note={ note } content="" />);
    });

    it("sets the title", () => {
      expect(screen.getByRole("heading").textContent).toEqual("My personal notes for Title");
    });

    it("renders the authors with an 'and' between then", () => {
      expect(screen.getByTestId("subhead").textContent).toEqual(
        "From Source by Sylvester Stallone, Dolph Lundgren and Carl Weathers"
      );
    });
  });

  describe("when the note is for an article", () => {
    beforeEach(() => {
      note.category = ARTICLE_MEDIA;
      render(<NoteHeader note={ note } content="" />);
    });

    it("sets the title", () => {
      expect(screen.getByRole("heading").textContent).toEqual("My personal notes for Title");
    });

    it("render's the correct subheader", () => {
      expect(screen.getByTestId("subhead").textContent).toEqual("An article by Author from Source");
    });
  });

  describe("when the note is for a book", () => {
    beforeEach(() => {
      note.category = BOOK_MEDIA;
      render(<NoteHeader note={ note } content="" />);
    });

    it("sets the title", () => {
      expect(screen.getByRole("heading").textContent).toEqual("My personal notes for Title");
    });

    it("render's the correct subheader", () => {
      expect(screen.getByTestId("subhead").textContent).toEqual("A book by Author from Source");
    });
  });

  describe("when the note is for a live talk", () => {
    beforeEach(() => {
      note.category = LIVE_TALK_MEDIA;
      render(<NoteHeader note={ note } content="" />);
    });

    it("sets the title", () => {
      expect(screen.getByRole("heading").textContent).toEqual("My personal notes for Title");
    });

    it("render's the correct subheader", () => {
      expect(screen.getByTestId("subhead").textContent)
        .toEqual("A talk by Author I attended at Source");
    });
  });

  describe("when the note is for a talk", () => {
    beforeEach(() => {
      note.category = TALK_MEDIA;
      render(<NoteHeader note={ note } content="" />);
    });

    it("sets the title", () => {
      expect(screen.getByRole("heading").textContent).toEqual("My personal notes for Title");
    });

    it("render's the correct subheader", () => {
      expect(screen.getByTestId("subhead").textContent).toEqual("A talk by Author from Source");
    });
  });

  describe("when the note is for a podcast", () => {
    beforeEach(() => {
      note.category = PODCAST_MEDIA;
      render(<NoteHeader note={ note } content="" />);
    });

    it("sets the title", () => {
      expect(screen.getByRole("heading").textContent).toEqual("My personal notes for Title");
    });

    it("render's the correct subheader", () => {
      expect(screen.getByTestId("subhead").textContent)
        .toEqual("From Source, a podcast by Author");
    });
  });

  describe("when the note is for a video", () => {
    beforeEach(() => {
      note.category = VIDEO_MEDIA;
      render(<NoteHeader note={ note } content="" />);
    });

    it("sets the title", () => {
      expect(screen.getByRole("heading").textContent).toEqual("My personal notes for Title");
    });

    it("render's the correct subheader", () => {
      expect(screen.getByTestId("subhead").textContent)
        .toEqual("A video by Author from Source");
    });
  });
});
