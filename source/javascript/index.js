import landingPage from "./landing-page";
import notesPage from "./notes-page";

// If we're not on the landing page, don't do anything
if (window.location.pathname === "/") {
  landingPage();
}

if (window.location.pathname === "/notes/") {
  notesPage();
}
