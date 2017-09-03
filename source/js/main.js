const PORTRAIT_MEDIA_QUERY = "(max-aspect-ratio: 3/4)";
const LANDSCAPE_VIEW_BOX = "0 0 1296 445";
const PORTRAIT_VIEW_BOX = "0 0 565 871";

function mediaQueryMatches(mediaQuery) {
  return window.matchMedia(mediaQuery).matches;
}

function viewBox() {
  return mediaQueryMatches(PORTRAIT_MEDIA_QUERY) ? PORTRAIT_VIEW_BOX : LANDSCAPE_VIEW_BOX;
}

function setViewBox() {
  document
    .querySelector(".main")
    .setAttribute("viewBox", viewBox());
}

// Set the view box right away. We don't need a ready even because we know the structure of the DOM,
// and that this script is loaded after the main SVG.
setViewBox();

// Whenever the window size changes, update the viewBox.
window.addEventListener('resize', setViewBox);
