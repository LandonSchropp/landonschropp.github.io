import { Tag } from "./tag";
import { useCurrentTag } from "@/hooks/use-current-tag";
import { useCallback } from "react";

// type TagGroupProps = {
//   children: React.ReactNode;
// };
//
// /*
//  * The tag groups exist to allow the tags to wrap in a grouped fashion. This prevents one "lone tag"
//  * from sitting on the next line on standard mobile sizes.
//  */
// function TagGroup({ children }: TagGroupProps) {
//   return <span className="flex gap-2">{children}</span>;
// }

type TagsProps<T extends string> = {
  type: string;
  values: readonly T[];
};

export function Tags<T extends string>({ values, type }: TagsProps<T>) {
  const [currentTag, setCurrentTag] = useCurrentTag(type, values);

  const toggleTag = useCallback(
    (tag: T | null) => setCurrentTag(currentTag === tag ? null : tag),
    [currentTag, setCurrentTag],
  );

  return (
    <div className="mb-4 mt-3.5 flex flex-wrap justify-center gap-2">
      {values.map((tag) => (
        <Tag
          key={tag}
          value={tag}
          onClick={toggleTag}
          selected={currentTag === tag}
          attribute={type}
        />
      ))}
    </div>
  );
}
