import { useCallback } from "react";
import {
  BUSINESS_CATEGORY,
  DEVELOPMENT_CATEGORY,
  DESIGN_CATEGORY,
  PSYCHOLOGY_CATEGORY,
  OTHER_CATEGORY,
} from "../constants";
import { useCategoryFilter } from "../hooks/use-category-filter";
import type { Category } from "../types";
import { Tag } from "./tag";

type TagGroupProps = {
  children: React.ReactNode;
};

// The tag groups exist to allow the tags to wrap in a grouped fashion. This prevents one "lone tag"
// from sitting on the next line on standard mobile sizes.
function TagGroup({ children }: TagGroupProps) {
  return <span className="flex gap-2">{children}</span>;
}

export function Tags() {
  const [category, setCategory] = useCategoryFilter();

  const toggleCategory = useCallback(
    (updatedCategory: Category | null) => {
      setCategory(category === updatedCategory ? null : updatedCategory);
    },
    [category, setCategory],
  );

  return (
    <div className="flex flex-wrap justify-center gap-2 my-4">
      <TagGroup>
        <Tag
          category={BUSINESS_CATEGORY}
          onClick={toggleCategory}
          selected={category === BUSINESS_CATEGORY}
        />
        <Tag
          category={DEVELOPMENT_CATEGORY}
          onClick={toggleCategory}
          selected={category === DEVELOPMENT_CATEGORY}
        />
        <Tag
          category={DESIGN_CATEGORY}
          onClick={toggleCategory}
          selected={category === DESIGN_CATEGORY}
        />
      </TagGroup>
      <TagGroup>
        <Tag
          category={PSYCHOLOGY_CATEGORY}
          onClick={toggleCategory}
          selected={category === PSYCHOLOGY_CATEGORY}
        />
        <Tag
          category={OTHER_CATEGORY}
          onClick={toggleCategory}
          selected={category === OTHER_CATEGORY}
        />
      </TagGroup>
    </div>
  );
}
