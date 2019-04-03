import marked from './marked';
import listify from '../eleventy/filters/listify';

export default function transformContentfulEntry({ fields }) {
  let { content, date, title, authors, ...data } = fields;

  // Generate a description automatically using the title.
  let description = `These are my personal notes from ${ title } by ${ listify(authors) }.`;

  return {
    ...data,
    title,
    authors,
    date: new Date(date),
    content: marked(content),
    description
  };
}
