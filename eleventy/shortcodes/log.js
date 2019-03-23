export default function log(object) {
  return `<pre>${ JSON.stringify(object, null, 2) }</pre>`;
}
