import { Tag, GenericTagComponent } from "@/components/content/tag";
import {
  TYPESCRIPT_JAVASCRIPT_TECHNOLOGY,
  RUBY_TECHNOLOGY,
  GIT_TECHNOLOGY,
  NEOVIM_TECHNOLOGY,
  SHELL_TECHNOLOGY,
} from "@/constants";
import { Technology } from "@/types";
import { ComponentProps } from "react";

const ICONS = {
  [TYPESCRIPT_JAVASCRIPT_TECHNOLOGY]: "star",
  [RUBY_TECHNOLOGY]: "star",
  [GIT_TECHNOLOGY]: "star",
  [NEOVIM_TECHNOLOGY]: "star",
  [SHELL_TECHNOLOGY]: "star",
} satisfies Record<Technology, ComponentProps<typeof Tag>["icon"]>;

type TodayILearnedTagComponent = GenericTagComponent<Technology>;
type TodayILearnedTagProps = ComponentProps<TodayILearnedTagComponent>;

export const TodayILearnedTag: GenericTagComponent<Technology> = (props: TodayILearnedTagProps) => {
  return <Tag {...props} attribute="technology" icon={ICONS[props.value]} />;
};
