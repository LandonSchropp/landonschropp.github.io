import voca from 'voca';

export default function icon(name) {
  return `
    <svg class="icon">
      <title>${ voca.titleCase(name) }</title>
      <use xlink:href="/images/icons.svg#${ name }" />
    </svg>
  `;
}
