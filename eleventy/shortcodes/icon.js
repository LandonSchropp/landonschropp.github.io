export default function icon(name, title) {
  return `
    <svg class="icon">
      <title>${ title }</title>
      <use xlink:href="/images/icons.svg#${ name }" />
    </svg>
  `;
}
