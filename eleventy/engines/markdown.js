import marked from 'marked';

// Creates an instance of the markdown library.
export default {
  render(source) {
    return marked(source);
  }
};
