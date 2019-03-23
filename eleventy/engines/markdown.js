import marked from 'marked';

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
export default {
  render(source) {
    return marked(source, { renderer });
  }
};
