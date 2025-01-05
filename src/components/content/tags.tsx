import { GenericTagComponent } from "./tag";
import { useCurrentTag } from "@/hooks/use-current-tag";
import { useCallback } from "react";

type TagsProps<T extends string> = {
  type: string;
  values: readonly T[];
  component: GenericTagComponent<T>;
};

export function Tags<T extends string>({ values, type, component: TagComponent }: TagsProps<T>) {
  const [currentTag, setCurrentTag] = useCurrentTag(type, values);

  const toggleTag = useCallback(
    (tag: T) => setCurrentTag(currentTag === tag ? null : tag),
    [currentTag, setCurrentTag],
  );

  const tags = values.map((tag) => (
    <TagComponent key={tag} value={tag} onClick={toggleTag} selected={currentTag === tag} />
  ));

  return <div className="mb-4 mt-3.5 flex flex-wrap justify-center gap-2">{tags}</div>;
}
