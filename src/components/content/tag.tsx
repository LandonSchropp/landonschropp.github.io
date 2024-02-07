type BasseTagProps<T extends string> = {
  value: T;
  attribute: string;
};

type ButtonTagProps<T extends string> = {
  onClick: (tag: T) => void;
  selected: boolean;
};

type LinkTagProps = {
  href: string;
};

type TagProps<T extends string> = BasseTagProps<T> & (ButtonTagProps<T> | LinkTagProps);

export function Tag<T extends string>({ value, attribute, ...props }: TagProps<T>) {
  const dataParams = { [`data-${attribute}`]: value };

  const className = `
    inline-block rounded-full border-none bg-theme-accent px-2 py-0.75 font-sans text-xs
    font-normal uppercase tracking-wider text-white no-underline transition-shadow duration-75
    ease-in hocus:shadow-outline hocus:shadow-theme-accent/50 selected:shadow-outline
    selected:shadow-theme-accent/50 md:text-2xs hover:no-underline
  `;

  if ("href" in props) {
    return (
      <a href={props.href} className={className} {...dataParams}>
        {value}
      </a>
    );
  }

  const { onClick, selected } = props;

  return (
    <button
      type="button"
      className={className}
      {...dataParams}
      onClick={() => onClick(value)}
      role="switch"
      aria-checked={selected}
    >
      {value}
    </button>
  );
}
