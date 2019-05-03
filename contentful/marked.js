import marked from 'marked';
import _ from 'lodash';
import highlight from 'highlight.js';

// Set the options for the renderer
marked.setOptions({
  highlight(code, language) {
    return highlight.highlightAuto(code).value;
  }
});

// Create an instance of the renderer and capture its old blockquote implementation
let renderer = new marked.Renderer();
let blockquote = renderer.blockquote;

const CITATION_REGEX = /\s+--(.*\S+)\s*<\/p>\s*<\/blockquote>/gim;

// Override the blockquote implementation to handle my custom citation format
renderer.blockquote = function(text) {
  let html = blockquote.call(this, text);

  html = html.replace(CITATION_REGEX, (match, person) => {
    return `</p><cite>${ person }</cite></blockquote>`;
  });

  return html;
};

// Creates an instance of the markdown library.
export default _.partial(marked, _, { renderer });
