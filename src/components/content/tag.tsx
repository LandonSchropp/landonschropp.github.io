import { Icon } from "../base/icon";
import { ComponentProps, ComponentType } from "react";

type BaseTagProps<T extends string> = {
  value: T;
  attribute: string;
  icon?: ComponentProps<typeof Icon>[`name`];
};

const TAG_CLASS_NAME = `
    inline-block rounded-full border-none bg-theme-accent px-2 py-0.75 font-sans text-xs
    font-normal uppercase tracking-wider text-white no-underline transition-shadow duration-75
    ease-in hocus:shadow-outline hocus:shadow-theme-accent/50 selected:shadow-outline
    selected:shadow-theme-accent/50 md:text-2xs
  `;

function TagContent<T extends string>({ icon, value }: BaseTagProps<T>) {
  if (!icon) {
    return value;
  }

  return (
    <>
      <Icon className="relative top-[-0.1em] mr-[0.5em] h-[1em] w-[1em]" name={icon} hidden></Icon>
      {value}
    </>
  );
}

type ButtonTagProps<T extends string> = BaseTagProps<T> & {
  onClick: (tag: T) => void;
  selected: boolean;
};

export function ButtonTag<T extends string>(props: ButtonTagProps<T>) {
  const { onClick, selected, attribute, value } = props;
  const dataParams = { [`data-${attribute}`]: value };

  return (
    <button
      type="button"
      className={TAG_CLASS_NAME}
      {...dataParams}
      onClick={() => onClick(value)}
      role="switch"
      aria-checked={selected}
    >
      <TagContent {...props} />
    </button>
  );
}

type LinkTagProps<T extends string> = BaseTagProps<T> & {
  href: string;
};

export function LinkTag<T extends string>({ ...props }: LinkTagProps<T>) {
  const { href, attribute, value } = props;
  const dataParams = { [`data-${attribute}`]: value };

  return (
    <a href={href} className={TAG_CLASS_NAME} {...dataParams}>
      <TagContent {...props} />
    </a>
  );
}

type TagProps<T extends string> = LinkTagProps<T> | ButtonTagProps<T>;

export function Tag<T extends string>(props: TagProps<T>) {
  return "href" in props ? <LinkTag {...props} /> : <ButtonTag {...props} />;
}

type GenericTagComponentProps<T extends string> =
  | Omit<ButtonTagProps<T>, "attribute" | "icon">
  | Omit<LinkTagProps<T>, "attribute" | "icon">;

/**
 * This is a generic tag component type that can be passed as a prop in other components. It omits
 * the `attribute` and `icon` props, because those props should be handled by the wrapper component.
 */
export type GenericTagComponent<T extends string> = ComponentType<GenericTagComponentProps<T>>;
