import { render, screen } from "@testing-library/react";
import React from "react";

import { NoteHeader } from "../../src/components/note-header";
import {
  ARTICLE_CATEGORY,
  BOOK_CATEGORY,
  LIVE_TALK_CATEGORY,
  OTHER_CATEGORY,
  PODCAST_CATEGORY,
  TALK_CATEGORY,
  VIDEO_CATEGORY
} from "../../src/data/constants";

describe("NoteHeader", () => {
  let note;

  beforeEach(() => {
    note = {
      title: "Title",
      authors: [ "Author" ],
      category: ARTICLE_CATEGORY,
      date: "1988-10-05",
      published: true,
      slug: "slug",
      source: "Source",
      url: "https://example.com"
    };
  });

  describe("when the note is for an article", () => {
    beforeEach(() => render(<NoteHeader note={ note } content="" />));

    it("render's the correct subheader", () => {
      expect(screen.getByRole("banner")).toHaveTextContent("An article by Author from Source");
    });
  });

  describe("when the note is for a book", () => {
    beforeEach(() => {
      note.category = BOOK_CATEGORY;
      render(<NoteHeader note={ note } content="" />);
    });

    it("render's the correct subheader", () => {
      expect(screen.getByRole("banner")).toHaveTextContent("A book by Author");
    });
  });

  describe("when the note is for a live talk", () => {
    beforeEach(() => {
      note.category = LIVE_TALK_CATEGORY;
      render(<NoteHeader note={ note } content="" />);
    });

    it("render's the correct subheader", () => {
      expect(screen.getByRole("banner"))
        .toHaveTextContent("A talk by Author I attended at Source");
    });
  });

  describe("when the note is for a talk", () => {
    beforeEach(() => {
      note.category = TALK_CATEGORY;
      render(<NoteHeader note={ note } content="" />);
    });

    it("render's the correct subheader", () => {
      expect(screen.getByRole("banner"))
        .toHaveTextContent("A talk by Author from Source");
    });
  });

  describe("when the note is for a podcast", () => {
    beforeEach(() => {
      note.category = PODCAST_CATEGORY;
      render(<NoteHeader note={ note } content="" />);
    });

    it("render's the correct subheader", () => {
      expect(screen.getByRole("banner"))
        .toHaveTextContent("From Source, a podcast by Author");
    });
  });

  describe("when the note is for a video", () => {
    beforeEach(() => {
      note.category = VIDEO_CATEGORY;
      render(<NoteHeader note={ note } content="" />);
    });

    it("render's the correct subheader", () => {
      expect(screen.getByRole("banner"))
        .toHaveTextContent("A video by Author from Source");
    });
  });

  describe("when the note is for something else", () => {
    beforeEach(() => {
      note.category = OTHER_CATEGORY;
      render(<NoteHeader note={ note } content="" />);
    });

    it("render's the correct subheader", () => {
      expect(screen.getByRole("banner"))
        .toHaveTextContent("From Source by Author");
    });
  });
});
