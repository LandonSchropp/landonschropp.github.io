import { Tag, GenericTagComponent } from "@/components/content/tag";
import {
  BUSINESS_CATEGORY,
  DEVELOPMENT_CATEGORY,
  HEALTH_CATEGORY,
  OTHER_CATEGORY,
  PSYCHOLOGY_CATEGORY,
} from "@/constants";
import { Category } from "@/types";
import { ComponentProps } from "react";

const ICONS = {
  [BUSINESS_CATEGORY]: "briefcase",
  [DEVELOPMENT_CATEGORY]: "code",
  [PSYCHOLOGY_CATEGORY]: "brain",
  [HEALTH_CATEGORY]: "activity",
  [OTHER_CATEGORY]: "star",
} satisfies Record<Category, ComponentProps<typeof Tag>["icon"]>;

type NoteTagComponent = GenericTagComponent<Category>;
type NoteTagProps = ComponentProps<NoteTagComponent>;

export const NoteTag: GenericTagComponent<Category> = (props: NoteTagProps) => {
  return <Tag {...props} attribute="category" icon={ICONS[props.value]} />;
};
