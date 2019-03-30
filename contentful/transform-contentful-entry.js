import marked from './marked';

export default function transformContentfulEntry({ fields }) {
  let { content, date, ...data } = fields;

  return {
    ...data,
    date: new Date(date),
    content: marked(content)
  };
}
