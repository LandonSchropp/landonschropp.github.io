import type { Category } from "../types";

type TagProps = {
  category: Category;
  onClick: (category: Category) => void;
  selected: boolean;
};

export function Tag({ category, onClick, selected }: TagProps) {
  return (
    <button
      type="button"
      className={`
        inline-block bg-theme-accent px-2 py-0.75 text-white font-sans font-normal 
        uppercase text-xs md:text-2xs tracking-wider border-none rounded-full no-underline
        transition-shadow duration-75 ease-in [&[aria-checked="true"]]:shadow-outline 
        [&[aria-checked="true"]]:shadow-theme-accent/50
      `}
      data-category={category}
      onClick={() => onClick(category)}
      role="switch"
      aria-checked={selected}
    >
      {category}
    </button>
  );
}
