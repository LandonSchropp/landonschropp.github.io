import type { Category } from "@/types";

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
        inline-block rounded-full border-none bg-theme-accent px-2 py-0.75 font-sans 
        text-xs font-normal uppercase tracking-wider text-white no-underline transition-shadow
        duration-75 ease-in hocus:shadow-outline hocus:shadow-theme-accent/50 
        selected:shadow-outline selected:shadow-theme-accent/50 md:text-2xs 
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
