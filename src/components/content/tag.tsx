type TagProps<T extends string> = {
  value: T;
  onClick: (tag: T) => void;
  selected: boolean;
  attribute: string;
};

export function Tag<T extends string>({ value, onClick, selected, attribute }: TagProps<T>) {
  const dataParams = { [`data-${attribute}`]: value };

  return (
    <button
      type="button"
      className={`
        inline-block rounded-full border-none bg-theme-accent px-2 py-0.75 font-sans 
        text-xs font-normal uppercase tracking-wider text-white no-underline transition-shadow
        duration-75 ease-in hocus:shadow-outline hocus:shadow-theme-accent/50 
        selected:shadow-outline selected:shadow-theme-accent/50 md:text-2xs 
      `}
      {...dataParams}
      onClick={() => onClick(value)}
      role="switch"
      aria-checked={selected}
    >
      {value}
    </button>
  );
}
